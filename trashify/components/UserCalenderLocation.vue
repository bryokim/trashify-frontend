<template>
  <v-card
    color="#ffffff"
    max-width="350px"
    class="mx-auto border-radius-10"
    min-height="300px"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12" class="mb-5">
          <UserCalender></UserCalender>
        </v-col>

        <v-col cols="12" class="mb-5">
          <UserLocation></UserLocation>
        </v-col>

        <v-col cols="6">
          <VBtnPrimary class="btn-primary border-radius-10 mb-5" block
            ><p class="btn-text">Update Schedule</p></VBtnPrimary
          >
        </v-col>

        <v-col cols="6">
          <VBtnPrimary class="btn-primary border-radius-10" block
            ><p class="btn-text">Change Location</p></VBtnPrimary
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
