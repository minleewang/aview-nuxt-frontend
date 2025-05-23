import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
  meta: {
    name: "googleAuthentication",
    configKey: "googleAuthentication",
  },

  setup(moduleOptions, nuxt) {
    const themeDir = resolve(__dirname, "..");

    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "googleRedirection",
        path: "/google-oauth/redirect-access-token",
        file: resolve(
          themeDir,
          "googleAuthentication/redirection/GoogleRedirection.vue"
        ),
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "store"));
    });
  },
});
