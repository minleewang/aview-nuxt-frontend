import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
  meta: {
    name: "guestAuthentication",
    configKey: "guestAuthentication",
  },

  setup(moduleOptions, nuxt) {
    const themeDir = resolve(__dirname, "..");

    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "guestRedirection",
        path: "/guest-oauth/redirect-access-token",
        file: resolve(
          themeDir,
          "guestAuthentication/redirection/GuestRedirection.vue"
        ),
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "store"));
    });
  },
});
