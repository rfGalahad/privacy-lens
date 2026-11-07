import { cors, json } from '../_shared/cors.ts';
import { getUser } from '../_shared/auth.ts';

import { computeRisk } from './scoring.ts';
import { callGemini, sanitize } from './ai.ts';


Deno.serve(async (req) => {

  // HANDLE CORS PREFLIGHT
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: cors(req.headers.get('origin')),
    });
  }

  // AUTHENTICATE
  const user = await getUser(req);
  if (!user) {
    return json(req, { error: 'unauthorized' }, 401);
  }

  // VALIDATE INPUT
  const { values } = await req.json().catch(() => ({}));

  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    return json(req, { error: 'invalid_input' }, 400);
  }

  const input = sanitize(values);

  if (JSON.stringify(input).length > 20_000) {
    return json(req, { error: 'input_too_large' }, 413);
  }

  try {
    const risk = computeRisk(input);
    const { analysis } = await callGemini(input, risk);

    return json(req, {
      score: risk.score,
      level: risk.level,
      breakdown: risk.breakdown,
      result: analysis,
    });
  } catch (e) {
    console.error(`analyze-pia failed (user ${user.id}):`, (e as Error).message);
    return json(req, { error: 'analysis_failed' }, 502);
  }
});