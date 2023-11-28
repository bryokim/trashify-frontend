import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

import colors from "vuetify/util/colors";
import { VBtn } from "vuetify/components/VBtn";
import { VCard } from "vuetify/lib/components/index.mjs";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.blue.darken1, // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            background: "#212C3F",
            surface: "#ffffff",
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: colors.blue.accent1,
          },
        },
      },
    },
    aliases: {
      VBtnSecondary: VBtn,
      VBtnTertiary: VBtn,
      VBtnPrimary: VBtn,
      VCardCalender: VCard,
    },
    defaults: {
      VBtn: {
        color: "primary",
        variant: "text",
      },
      VBtnSecondary: {
        color: "secondary",
        variant: "flat",
      },
      VBtnTertiary: {
        rounded: true,
        variant: "plain",
      },
      VBtnPrimary: {
        rounded: "9px",
        variant: "flat",
        color: "#3250EC",
        class: "font-weight-bold text-lowercase",
      },
      VCardCalender: {
        rounded: "9px",
        variant: "flat",
        class: "calender",
      },
    },
  });
  app.vueApp.use(vuetify);
});
