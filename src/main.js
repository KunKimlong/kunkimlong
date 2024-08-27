import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import jQuery from '@/assets/Js/jquery-3.7.1.min.js'; // Import jQuery
window.$ = window.jQuery = jQuery; // Make jQuery globally available
import '@/assets/Js/script.js';
import '@/assets/Js/data.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/Style/style.css';
// import '@popperjs/core';
import App from './App.vue'
import router from "./routes.js";

createApp(App).
use(router).
mount('#app')
