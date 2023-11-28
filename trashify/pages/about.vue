<template>
  <h1>This is an about</h1>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      middleware: ["user-only"],
    });
  },
};
</script>
