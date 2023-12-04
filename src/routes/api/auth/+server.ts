import type { RequestHandler } from "./$types";

export const POST = (async ({ params, request }) => {
  const { email, password } = await request.json();
  let response = await fetch(`https://llacademy.ng/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const { data } = await response.json();

  return new Response(JSON.stringify({ data }), { status: 200 });
}) satisfies RequestHandler;