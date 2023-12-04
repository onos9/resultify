import type { Class, Config, Role, User } from "@prisma/client";
import { writable } from "svelte/store";

export const userDetail = writable<(User & { role: Role | null } & { class: Class | null }) | null>(
  {} as User & { role: Role | null } & { class: Class | null }
);

export const user = writable<UserDetail | null>();
