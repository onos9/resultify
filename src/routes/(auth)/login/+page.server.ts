import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import type { Action, Actions, PageServerLoad } from "./$types";

import { db } from "$lib/server/database";
import type { Prisma } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.userDetails) {
    throw redirect(302, "/");
  }
};

const login: Action = async ({ cookies, request }) => {
  const { email, password } = Object.fromEntries(await request.formData());

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { invalid: true, email, password });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return fail(404, { success: false, message: `Email ${email} is incorrect` });
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash as string);

  if (!userPassword) {
    return fail(400, { success: false, message: `Password is incorrect` });
  }

  const authenticatedUser = await db.user.update({
    where: { email: user.email } as Prisma.UserWhereUniqueInput,
    data: { userAuthToken: crypto.randomUUID() },
  });

  cookies.delete("session", { path: "/" });
  cookies.set("session", authenticatedUser.userAuthToken as string, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(302, "/");
};

const authenticate: Action = async ({ cookies, request, fetch, locals }) => {
  const { email, password } = Object.fromEntries(await request.formData());

  let response = await fetch(`/api/auth`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const { data } = await response.json();
  console.log({ data });

  cookies.delete("session", { path: "/" });
  const payload = JSON.parse(Buffer.from(data.accessToken.split(".")[1], "base64").toString());
  cookies.set("session", data.accessToken as string, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: payload.exp,
  });

  redirect(302, "/");
};

export const actions: Actions = { login, authenticate };
