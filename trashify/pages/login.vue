<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

import { useAuth } from "~/composables/useAuth";

definePageMeta({
  middleware: ["logged-out"],
});

const schema = yup.object({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required(),
});

const { defineComponentBinds, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

// Refer to the docs for how to make advanced validation behaviors with dynamic configs
// TODO: Add link
const vuetifyConfig = (state) => ({
  props: {
    "error-messages": state.errors,
  },
});

const email = defineComponentBinds("email", vuetifyConfig);
const password = defineComponentBinds("password", vuetifyConfig);

const form = reactive({
  error: "",
  loading: false,
});

const signup = handleSubmit(async (values) => {
  console.log("Submitted with", values);
  const { login } = useAuth();
  try {
    form.loading = true;
    await login(values.email, values.password, true).then(() => {
      form.loading = false;
      navigateTo("/");
    });
  } catch (error) {
    console.log(error);

    form.loading = false;
    if (error.data.message) form.error = error.data.message;
  }

  resetForm();
});
</script>

<template>
  <div>
    <v-card class="mx-auto mt-10" max-width="350" rounded="10">
      <template v-slot:title class="text-center"> Log in </template>
      <div>
        <p v-if="form.error" class="mb-3 text-center text-red">
          {{ form.error }}
        </p>
      </div>
      <v-form @submit="signup" class="px-5">
        <v-text-field
          v-bind="email"
          label="Email"
          type="email"
          color="primary"
          variant="underlined"
        />
        <v-text-field
          v-bind="password"
          label="Password"
          type="password"
          color="primary"
          variant="underlined"
        />

        <br />

        <div class="text-center">
          <v-btn
            :loading="form.loading"
            color="primary"
            type="submit"
            :elevation="10"
            variant="flat"
            block
            class="mb-4"
          >
            Log in
          </v-btn>
          <div class="mb-3">
            <p class="text-caption font-weight-medium">
              Don't have an account?
              <NuxtLink class="text-decoration-none text-primary" to="/signup"
                >Sign up</NuxtLink
              >
            </p>
          </div>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
