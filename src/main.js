import './assets/tailwind.js'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
// import 'ant-design-vue/dist/reset.css';
// import Antd from 'ant-design-vue';
import axiosConfig from "@/configs/axiosConfig.js";

const app = createApp(App)
// app.use(Antd)
app.use(createPinia())
app.use(router)
axiosConfig()
app.mount('#app')
