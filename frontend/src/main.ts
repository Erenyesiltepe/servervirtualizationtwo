import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/views/layouts/App.vue"
import router from "@/router/index"
import naive from "naive-ui"
import i18Instance from "@/utils/i18n"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(i18Instance)

app.mount("#app")
