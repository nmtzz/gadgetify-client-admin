import './assets/tailwind.js'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
// import 'ant-design-vue/dist/reset.css';
// import Antd from 'ant-design-vue';
import axiosConfig from "@/configs/axiosConfig.js";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
// app.use(Antd)
app.use(createPinia())
app.use(LoadingPlugin)
app.use(router)
axiosConfig()
app.mount('#app')
