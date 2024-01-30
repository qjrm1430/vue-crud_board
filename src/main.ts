import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./router/plugins/vuetify";
import { loadFonts } from "./router/plugins/webfontloader";

loadFonts();
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
