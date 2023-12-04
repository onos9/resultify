import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { user } from "$lib/stores/user";

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  // redirect user if not logged in
  if (!locals.userDetails) {
    throw redirect(302, "/login");
  }

  // /api/marks-grade
  // /api/assign-subject
  // /api/exam-type

  let classDetail = async () => {
    let res = await fetch("/api/assign-class-teacher");
    const { data } = await res.json();
    return data.assign_class_teachers.find(
      (cls: any) =>
        cls.class_teachers.find((tch: any) => tch?.teacher_id === locals.userDetails.staff_no)
          ?.teacher_id == locals.userDetails.staff_no
    );
  };

  let students = async () => {
    let res = await fetch("/api/student-list");
    const { data } = await res.json();
    return data.students;
  };

  let subjects = async () => {
    let res = await fetch("/api/assign-subject");
    const { data } = await res.json();
    return data;
  };

  let grades = async () => {
    let res = await fetch("/api/marks-grade");
    const { data } = await res.json();
    return data;
  };

  let exam = async () => {
    let res = await fetch("/api/exam-type");
    const { data } = await res.json();
    console.log({ data });
    return data;
  };

  return {
    classDetail: classDetail(),
    students: students(),
    subjects: subjects(),
    grades: grades(),
    user: locals.userDetails,
    configs: locals.configs,
  };
};
