export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    return null;
  }

  return user;
});
