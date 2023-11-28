<template>
  <div class="mx-auto" max-width="400px">
    <v-card class="mx-auto mb-4 mt-4" max-width="350px" variant="text">
      <h2 class="text-center">
        <span class="text-red-accent-1">2 days</span> To Next Pickup
      </h2>
    </v-card>

    <UserCalenderLocation class="mb-15"></UserCalenderLocation>

    <UserCollector class="mb-10"></UserCollector>

    <OrderButton></OrderButton>
  </div>
</template>

<style>
.border-radius-10 {
  border-radius: 10px;
}

.btn-primary {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.btn-text {
  color: #fff;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 140% */
  letter-spacing: -0.32px;
}
</style>
