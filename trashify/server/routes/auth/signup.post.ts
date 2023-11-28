import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string;
    password: string;
  }>(event);

  const { email, password } = body;
  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: "Email address and password are required",
    });
  }

  const data = await axios
    .post(
      "http://localhost:5000/signup",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);

      return createError({
        statusCode: error.response.statusCode,
        message: error.response.data.reason
          ? error.response.data.reason[0]
          : error.response.data.detail,
      });
    });

  return data;
});
