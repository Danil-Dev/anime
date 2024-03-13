import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Cloudflare добавляет заголовок `CF-Connecting-IP` с реальным IP клиента
    const ip = req.headers.get("cf-connecting-ip") || req.ip;

    return NextResponse.json({ geo: req.geo, ip: ip, ip1: req.ip });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
