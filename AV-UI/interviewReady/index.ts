import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
    meta: {
        name: "interviewReady",
        configKey: "interviewReady",
    },

    setup(moduleOptions, nuxt) {
        const themeDir = resolve(__dirname, "..");

        nuxt.hook("pages:extend", (pages) => {
            pages.push(
                {
                    name: "InterviewReadyCategoryPage.vue",
                    path: "/interview-ready",
                    file: resolve(themeDir, "interviewReady/pages/InterviewReadyCategoryPage.vue"),
                },
            )
        });
    },
});