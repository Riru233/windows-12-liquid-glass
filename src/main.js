import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VFluent from '@creatorsn/vfluent3'

const app = createApp(App)

app.use(router)
app.use(VFluent)

app.mount('#app')
