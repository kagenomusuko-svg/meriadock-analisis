export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  return res.status(410).json({ error: "Narrativa generativa retirada. Utiliza el expediente determinista." });
}
