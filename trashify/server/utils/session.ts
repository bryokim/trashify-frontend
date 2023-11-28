import type { H3Event } from "h3";
import { deserialize, unsign } from "./cookie";
import { User } from "@/types";

interface UserResponse {
  [propName: string]: any;
}

export async function getUserFromSession(event: H3Event) {
  const config = useRuntimeConfig();

  const cookie = getCookie(event, config.cookieName);
  if (!cookie) return null;

  const unsignedSession = unsign(cookie, config.cookieSecret);
  if (!unsignedSession) return null;

  const session = deserialize(unsignedSession);

  let user: UserResponse;
  try {
    user = await $fetch(`http://localhost:5000/users/${session.userId}`);
  } catch (error) {
    user = {};
  }

  if (!user || user.error ) {
    return null;
  }

  return user as User;
}
