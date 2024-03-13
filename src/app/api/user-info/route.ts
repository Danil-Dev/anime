import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest){
  console.log (req)
  try {

    const forwarded = req.headers.get('X-Forwarded-For')
    console.log (forwarded)
    const ip = forwarded.split(/, /)[0]

    return NextResponse.json({ geo: req.geo, ip: ip || req.ip });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}