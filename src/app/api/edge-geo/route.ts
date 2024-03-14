import { geolocation } from '@vercel/edge';

export const runtime = 'edge';

export function GET(request: Request) {
  const {  country} = geolocation(request);


  return new Response(JSON.stringify({
    country: country || undefined
  }), {
    headers: { 'content-type': 'application/json' },
  });
}