import { createApp } from 'vue'
import '@/assets/Js/bootstrap.min.js';
import '@/assets/Js/jquery-3.7.1.min.js';
import '@/assets/Js/script.js';
import '@/assets/Js/data.js';
import '@/assets/Style/bootstrap.min.css';
import '@/assets/Style/style.css';
// import '@popperjs/core';
import App from './App.vue'
import router from "./routes.js";

createApp(App).
use(router).
mount('#app')
