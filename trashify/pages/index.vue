<template>
  <template v-if="!currentUser">
    <Welcome></Welcome>
  </template>

  <template v-else>
    <Userhome></Userhome>
    <!-- <div>{{ currentUser }}</div>
    <button @click="get">Click me</button> -->
  </template>
</template>

<script>
export default {
  data() {
    return {
      currentUser: useAuthUser(),
    };
  },
  methods: {
    async get() {
      const headers = useRequestHeaders(["cookie"]);

      const data = await $fetch("http://localhost:5000/this-user", {
        headers: headers,
        credentials: "include",
      }).catch((error) => console.log(error));

      console.log(data);
    },
  },
};
</script>
