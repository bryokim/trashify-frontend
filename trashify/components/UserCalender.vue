<template>
  <v-card class="calender border-radius-10" min-height="150px">
    <v-card-item>
      <template v-slot:prepend>
        <v-card-title class="">
          <v-icon icon="mdi-calendar" start></v-icon>
          November 2001
        </v-card-title>
      </template>
    </v-card-item>
  </v-card>
</template>

<style>
.border-radius-10 {
  border-radius: 10px;
}

.calender {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
