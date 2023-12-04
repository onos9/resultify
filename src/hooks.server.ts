import { db } from "$lib/server/database";
import type { Handle } from "@sveltejs/kit";
import { cache, nodeCache } from "$lib/server/cache";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session") as string;
  if (!session) {
    return await resolve(event);
  }

  nodeCache.flushAll()
  try {
    const payload = JSON.parse(Buffer.from(session.split(".")[1], "base64").toString());
    if (!nodeCache.has(session)) {
      let res = await fetch(`https://llacademy.ng/api/staff-view/${payload.sub}`, {
        headers: {
          Authorization: session,
        },
      });
      const { data } = await res.json();
      event.locals.userDetails = data.staffDetails;
      nodeCache.set(session, data.staffDetails);
    } else {
      event.locals.userDetails = nodeCache.get(session) as UserDetail;
      // console.log({ user: event.locals.userDetails });
    }
  } catch (error: any) {
    console.log({ error: error });
  }

  const configs = await db.config.findMany();

  if (configs.length) {
    event.locals.configs = configs[0];
  }

  const theme = event.url.pathname.includes("print") ? "light" : "night";
  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%theme%", theme),
  });
};
