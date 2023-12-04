import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/database";
import { fail, redirect } from "@sveltejs/kit";
import type { Objective } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
  // if (!locals.user?.arm) throw redirect(302, "/settings");

  const exam_type = locals.configs?.exam_type;
  let objectives = () => db.objective.findMany({ where: { exam_type } as any });

  return {
    objectives: objectives(),
  };
};

export const actions: Actions = {
  objective: async ({ request, locals, url }) => {
    const id = url.searchParams.get("id") as string;
    const data = Object.fromEntries(await request.formData()) as any;
    const exam_type = locals.configs.exam_type;

    let objective: Objective;
    try {
      if (!id) {
        objective = await db.objective.create({
          data: { ...data, arm: locals.user?.arm, exam_type },
        });
      } else {
        objective = await db.objective.update({ where: { id }, data });
      }
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not create/update the objective." });
    }

    return { status: 200, objective };
  },

  delete: async ({ url }) => {
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(400, { message: "Invalid request" });
    }

    try {
      await db.objective.delete({ where: { id } });
    } catch (err) {
      console.error(err);
      return fail(500, {
        message: "Something went wrong deleting your article",
      });
    }

    return {
      status: 200,
    };
  },
};
