import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

export async function GET(req: NextRequest){
  console.log (req)
  try {

    const forwarded = req.headers.get('X-Forwarded-For')
    console.log (forwarded)
    const ip = forwarded.split(/, /)[0]

    // get Geo information from IP
    const resp = await axios.get(`https://ipapi.co/${ip}/json/`);
    const geoData = resp.data;

    return NextResponse.json({ geo: geoData || req.geo, ip: ip || req.ip });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}