import { getStore } from "@netlify/blobs";
export default async (req) => {
  const store = getStore("pcc");
  if (req.method === "POST") {
    const pw = Netlify.env.get("ADMIN_PASSWORD");
    if (!pw || req.headers.get("x-admin-key") !== pw)
      return new Response("Password salah", { status: 401 });
    await store.setJSON("content", await req.json());
    return Response.json({ ok: true });
  }
  const data = await store.get("content", { type: "json" });
  return Response.json(data || null, { headers: { "cache-control": "no-store" } });
};
export const config = { path: "/api/content" };
