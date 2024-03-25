<script>
import { mapStores } from "pinia";
import { useUserAuth } from "@/stores/auth";

import { configure, Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

configure({
  validateOnBlur: false,
  validateOnModelUpdate: true,
});

export default {
  setup() {
    const validationSchema = toTypedSchema(
      zod.object({
        email: zod
          .string()
          .min(1, { message: "Email is required" })
          .email({ message: "Must be a valid email" }),
        password: zod
          .string()
          .min(1, { message: "Password is required" })
          .min(8, { message: "Password is too short. Min length is 8." }),
        remember_me: zod.coerce.boolean(),
      })
    );

    return {
      validationSchema,
    };
  },

  data() {
    return {
      user: { email: "", password: "", rememberMe: "" },
    };
  },

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  computed: {
    ...mapStores(useUserAuth),
  },

  methods: {
    async login(values, { resetForm }) {
      console.log(values);
      console.log("Logging in");
      await this.sleep(5000).then(() => console.log("done"));
      // await this.userAuthStore.loginUser(this.user).then(() => {
      //   if (this.userAuthStore.isAuthenticated) {
      //     console.log("Authenticated");
      //   } else {
      //     console.log("Not auth");
      //   }
      // });

      // this.user = {
      //   email: "",
      //   password: "",
      //   rememberMe: "",
      // };
      resetForm();
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <h1 class="text-center">Login</h1>

        <Form
          :validation-schema="validationSchema"
          @submit="login"
          v-slot="{ isSubmitting, values }"
        >
          <div class="mb-3">
            <Field
              name="email"
              type="email"
              v-model.trim="user.email"
              class="form-control bg-light"
              placeholder="email"
            />
            <ErrorMessage name="email" />
          </div>

          <div class="mb-3">
            <Field
              name="password"
              type="password"
              v-model="user.password"
              class="form-control bg-light"
              placeholder="password"
            />
            <ErrorMessage name="password" />
          </div>

          <div class="form-check mb-3">
            <Field
              name="remember_me"
              type="checkbox"
              v-model="user.rememberMe"
              class="form-check-input"
              id="rememberMe"
              value="true"
            />
            <label for="rememberMe" class="form-check-label">
              Remember me
            </label>
          </div>

          <div>
            <pre>{{ values }}</pre>
          </div>

          <div class="">
            <button
              class="form-control btn btn-outline-success"
              type="submit"
              :disabled="isSubmitting"
              :class="{ submitting: isSubmitting }"
            >
              Log in
            </button>
          </div>
        </Form>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<style>
button.submitting::after {
  content: "";
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: calc(50% - 0.5rem);
  left: 1.5rem;
  border-radius: 2em;
  border-color: transparent transparent black black;
  border-style: solid;
  border-width: 0.15em;
  animation: spinner-rotation 0.75s infinite;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes spinner-rotation {
  to {
    transform: rotate(360deg);
  }
}
</style>
