import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest){
  console.log (req)
  try {
    return NextResponse.json({ geo: req.geo, ip: req.ip});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}