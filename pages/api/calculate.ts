import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Node = { level?: number; [key: string]: unknown };

type EvidenceVector = {
  q_d: (string | number)[][];
  b_d: (string | number)[];
};

function extractEvidenceVector(nodes: Node[] | undefined): EvidenceVector {
  if (!nodes || nodes.length === 0) {
    return { q_d: [["0"]], b_d: ["1"] };
  }
  const levels = nodes.map((n) => (n.level !== undefined ? n.level : 0));
  return {
    q_d: [levels],
    b_d: levels.map((l) => String(l)),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { case_id, mapa_output, discipline } = req.body as {
    case_id: string;
    mapa_output: { nodes?: Node[] };
    discipline?: string;
  };

  const evidenceVector = extractEvidenceVector(mapa_output?.nodes);

  const motorRes = await fetch(
    `${process.env.MOTOR_API_URL}/calculate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formula: "rstar",
        data: evidenceVector,
        discipline,
      }),
    }
  );

  const motorData = await motorRes.json();

  const { formula, result, trace, taxonomy_id } = motorData as {
    formula: string;
    result: unknown;
    trace: unknown;
    taxonomy_id?: string;
  };

  await supabase.from("motor_outputs").insert({
    case_id,
    formula,
    inputs: evidenceVector,
    result,
    trace,
  });

  return res.status(200).json({ formula, result, trace, taxonomy_id });
}
