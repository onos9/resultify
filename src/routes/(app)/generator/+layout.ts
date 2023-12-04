import { configs } from "$lib/stores/configs";
import { user } from "$lib/stores/user";
import type { LoadEvent } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { classDetail, grades, students, subjects } from "$lib/stores/data_store";
import { browser } from "$app/environment";

export const load = (async ({ data }: LoadEvent) => {
  user.set(data?.user || {});

  const cfg = data?.configs?.map((cfg: any) => [cfg.key, cfg.value]);
  configs.set(Object.fromEntries(cfg || []));

  const stds = data?.students.filter(
    (s: any) =>
      s?.class_id == data?.classDetail.class_id && s?.section_id == data?.classDetail.section_id
  );

  students.set(stds || null);
  subjects.set(data?.subjects || null);
  grades.set(data?.grades || null);
  classDetail.set(data?.classDetail || null);
  return {
    user: data?.user,
  };
}) satisfies LayoutLoad;
