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
                    path: "/interviewReady/category",
                    file: resolve(themeDir, "interviewReady/pages/InterviewReadyCategoryPage.vue"),
                },
                {
                    name: "InterviewReadyBackendSkillsPage",
                    path: "/interviewReady/skills",   // 경로를 수정할 필요가 있습니다.
                    file: resolve(themeDir, "interviewReady/pages/skills/InterviewReadyBackendSkillsPage.vue")
                },

            )
        });
    },
});