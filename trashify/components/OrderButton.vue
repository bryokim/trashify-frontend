<template>
  <v-container max-width="350px" class="mx-auto">
    <v-row align-content="center">
      <v-col cols="8" class="mx-auto">
        <v-btn class="order-btn border-radius-10" size="large" block>
          <p class="order-btn-text text-lowercase">Order Collection</p>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.order-btn {
  background: #64fcd9;
}
.order-btn-text {
  color: #000;
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
