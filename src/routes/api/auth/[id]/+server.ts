import type { RequestHandler } from "./$types";

export const GET = (async ({ params, request }) => {
  const { email, password } = await request.json();
  let response = await fetch(`https://llacademy.ng/staff-view/${params.id}`, {
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