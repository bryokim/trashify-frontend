import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const signup = async (email: string, password: string) => {
    await $fetch("/auth/signup", {
      method: "POST",
      body: { email, password },
    });
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await $fetch("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
        rememberMe,
      },
    });

    if (data) setUser(data);

    return authUser;
  };

  const logout = async () => {
    await $fetch("/auth/logout", {
      method: "POST",
    });

    setUser(null);
  };

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }

    return authUser;
  };

  return {
    signup,
    login,
    logout,
    me,
  };
};
