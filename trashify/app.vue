<!-- import { NuxtLayout, NuxtPage } from '#build/components'; -->

<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<style>
body {
  background-color: var(--primary);
}
</style>
