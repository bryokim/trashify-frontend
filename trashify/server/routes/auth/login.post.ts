import axios from "axios";


export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>(event);

  const { email, password, rememberMe } = body;
  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: "Email address and password are required",
    });
  }

  const config = useRuntimeConfig()

  const data = await axios
    .post(
      `${config.baseApiURL}/login`,
      {
        email: email,
        password: password,
        rememberMe: rememberMe,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const cookie = response.headers["set-cookie"];

      if (cookie) {
        const value = splitCookiesString(cookie);
        const cookies = splitSetCookieHeader(value);

        // set cookies received in the response.
        cookies.forEach((c) => {
          setCookie(event, c.name, c.value, {
            httpOnly: c.httpOnly || true,
            path: c.Path || "/",
            sameSite: c.sameSite || "strict",
            secure: c.Secure || false,
            expires: new Date(c.Expires),
            maxAge: c["Max-Age"] || 86400,
          });
        });
      }

      return response.data;
    })
    .catch((error) => {
      return createError({
        statusCode: error.response.statusCode,
        message: error.response.data.detail,
      });
    });

  const session = serialize({ userId: data.id });
  const signedSession = sign(session, config.cookieSecret);

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400,
  });

  return data;
});
