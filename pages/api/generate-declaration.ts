import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic();

function selectType(result: unknown): "A" | "B" | "C" | "D" {
  let value: number;

  if (Array.isArray(result)) {
    value = Number(result[0]);
  } else if (typeof result === "number") {
    value = result;
  } else if (result !== null && typeof result === "object") {
    const vals = Object.values(result as Record<string, unknown>);
    value = vals.length > 0 ? Number(vals[0]) : 0;
  } else {
    value = Number(result);
  }

  if (isNaN(value)) value = 0;

  if (value > 0.7) return "A";
  if (value > 0.5) return "B";
  if (value > 0.3) return "C";
  return "D";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { case_id } = req.body as { case_id: string };

  const { data: motorOutputs } = await supabase
    .from("motor_outputs")
    .select("*")
    .eq("case_id", case_id)
    .order("created_at", { ascending: false })
    .limit(1);

  const { data: evidenceMaps } = await supabase
    .from("evidence_maps")
    .select("*")
    .eq("case_id", case_id)
    .order("created_at", { ascending: false })
    .limit(1);

  const motorOutput = motorOutputs?.[0];
  const evidenceMap = evidenceMaps?.[0];

  const type = selectType(motorOutput?.result);

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system:
      "Eres el narrador formal de un motor de convergencia causal. Presentas los resultados en lenguaje ontológico. No emites opiniones.",
    messages: [
      {
        role: "user",
        content: `Genera una declaración de tipo ${type} para el siguiente resultado del motor: ${JSON.stringify(motorOutput?.result)}. Mapa de evidencias: ${JSON.stringify(evidenceMap?.mapa_json)}.`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  await supabase.from("declarations").insert({
    case_id,
    type,
    text,
  });

  return res.status(200).json({ type, text, case_id });
}
