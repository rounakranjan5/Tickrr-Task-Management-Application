

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'material-components-web/dist/material-components-web.min.css';

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router/routes';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
