import { defineStore } from "pinia";

import authService from "@/api";

export const useUserAuth = defineStore("userAuth", {
  state: () => ({ user: {}, isLogged: false }),

  getters: {
    isAuthenticated: (state) => state.isLogged,
  },

  actions: {
    async loginUser(user) {
      console.log(user.email, "inside");

      const response = await authService
        .post(
          "/login",
          {
            email: user.email,
            password: user.password,
            remember_me: user.rememberMe,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.$state.isLogged = true;
          }
        });

      return response;
    },
  },
});
