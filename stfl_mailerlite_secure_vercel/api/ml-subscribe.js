// Vercel Serverless Function (Node.js) — keeps your API key private
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const API_KEY = process.env.MAILERLITE_API_KEY;
  if (!API_KEY) {
    res.status(500).json({ error: "SERVER_MISCONFIGURED", message: "Missing MAILERLITE_API_KEY" });
    return;
  }

  let email, groupId;
  try {
    ({ email, groupId } = req.body || {});
  } catch {
    res.status(400).json({ error: "BAD_REQUEST" });
    return;
  }

  if (!email || !groupId) {
    res.status(400).json({ error: "MISSING_FIELDS", message: "email and groupId required" });
    return;
  }

  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        email,
        groups: [String(groupId)]
      })
    });

    const data = await mlRes.json().catch(() => ({}));
    if (!mlRes.ok) {
      res.status(mlRes.status).json(data);
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
}
