import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@primer/css/index.scss';

const app = createApp(App)

app.use(router)

app.mount('#app')
