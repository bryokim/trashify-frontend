<template>
  <v-card class="collector border-radius-10 mx-auto" max-width="350px" min-height="150px">
    <v-container>
      <v-row dense>
        <v-col cols="12" class="mb-5">
          <v-card class="collector border-radius-10">
            <v-card-title class="collector-title pa-0"
              >Your collector</v-card-title
            >
            <v-card-text class="collector-name"> Trash Takers </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3"> </v-col>

        <v-col cols="6">
          <VBtnPrimary class="btn-primary border-radius-10" block
            ><p class="btn-text">Update Collector</p></VBtnPrimary
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style>
.collector {
  background: #a2afbf;
}

.collector {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.collector-title {
  color: #000;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 140% */
  letter-spacing: -0.32px;
}

.collector-name {
  color: #0038ff;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 116.667% */
  letter-spacing: -0.32px;
}
</style>
