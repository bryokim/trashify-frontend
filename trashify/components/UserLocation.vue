<template>
  <v-card class="location border-radius-10" color="#e7eaee">
    <v-card-title class="location-title pa-0">Pickup location<v-icon icon="mdi-location"></v-icon>:</v-card-title>
    <v-card-text class="location-value"> Nowhere House No. 2 </v-card-text>
  </v-card>
</template>

<style>
.border-radius-10 {
  border-radius: 10px;
}

.location {
  box-shadow: none;
}

.location-title {
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

.location-value {
  color: #ff065f;
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
