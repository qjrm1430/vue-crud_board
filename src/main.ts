import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./router/plugins/vuetify";
import { loadFonts } from "./router/plugins/webfontloader";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

loadFonts();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
