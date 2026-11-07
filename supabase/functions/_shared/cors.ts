
const allowedOrigins = (Deno.env.get('TEST_APP_ORIGINS') ?? '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin':
    origin && allowedOrigins.includes(origin) ? origin : 'null',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin',
});

export const json = (
  req: Request,
  body: unknown,
  status = 200
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors(req.headers.get('origin')),
      'Content-Type': 'application/json',
    },
  });