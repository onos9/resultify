import type { Comment, Rating, Record, Remark, Result, Score } from "@prisma/client";
import { writable } from "svelte/store";
import type { ClassDetail, StudentDetail } from "../../app";

export const comments = writable<Comment[]>([]);

export const classDetail = writable<ClassDetail | undefined>();
export const student = writable<StudentDetail | undefined>();
export const students = writable<StudentDetail[] | []>();
export const subjects = writable<any[]>([]);
export const grades = writable<any[]>([]);

export const results = writable<
  (Result & {
    student: StudentDetail | null;
    ratings: Rating[];
    records: Record[];
    scores: Score[];
    remarks: Remark[];
  })[]
>([]);

export const result = writable<
  | (Result & {
      student: StudentDetail | null;
      ratings: Rating[];
      records: Record[];
      scores: Score[];
      remarks: Remark[];
    })
  | null
>();

// rStudent.subscribe((value) => {
//   if (browser) {
//     localStorage.student = JSON.stringify(value);
//   }
// });

// result.subscribe((value) => {
//   if (browser) {
//     localStorage.result = JSON.stringify(value);
//   }
// });
