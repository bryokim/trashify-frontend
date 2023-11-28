export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  deleteCookie(event, "trashify_user_session", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });

  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
});
