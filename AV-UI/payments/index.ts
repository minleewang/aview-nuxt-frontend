import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "payments",
		configKey: "payments",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "paymentsTestPage",
					path: "/payments/test/page",
					file: resolve(
						themeDir,
						"payments/pages/payment/test-payments.vue"
					),
				},
				{
					name: "paymentSuccessed",
					path: "/payments/succed",
					file: resolve(
						themeDir,
						"payments/pages/succed/payment-successed.vue"
					),
				},
				{
					name: "paymentFailed",
					path: "/payments/failed",
					file: resolve(
						themeDir,
						"payments/pages/failed/payment-failed.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "stores"));
		});
	},
});
