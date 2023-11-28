<script setup>
const currentUser = useAuthUser();

const logout = async () => {
  const { logout } = useAuth();

  await logout().then(() => {
    navigateTo("/");
  });
};
</script>

<template>
  <div>
    <v-toolbar :elevation="10" density="comfortable">
      <v-toolbar-title
        ><NuxtLink to="/" class="text-decoration-none text-red"
          >Trashify</NuxtLink
        ></v-toolbar-title
      >

      <v-col class="d-none d-sm-flex justify-end">
        <NuxtLink to="/">
          <v-btn :elevation="0" class="me-5"> Home </v-btn>
        </NuxtLink>

        <NuxtLink to="/about">
          <v-btn>About</v-btn>
        </NuxtLink>
      </v-col>

      <v-col class="justify-end d-flex v-col-lg-3" cols="4">
        <template v-if="currentUser">
          <v-btn :elevation="5" @click="logout" color="red" variant="tonal">
            Log out
          </v-btn>
        </template>

        <template v-else>
          <NuxtLink to="/signup">
            <v-btn :elevation="5" class="me-3" color="#64FCD9" variant="flat">
              Sign up
            </v-btn>
          </NuxtLink>

          <NuxtLink to="/login">
            <v-btn
              :elevation="5"
              append-icon="mdi-login"
              color="#3250EC"
              variant="flat"
            >
              Log in
              <template v-slot:append>
                <v-icon color="#000000"></v-icon>
              </template>
            </v-btn>
          </NuxtLink>
        </template>
      </v-col>
    </v-toolbar>
  </div>
</template>
