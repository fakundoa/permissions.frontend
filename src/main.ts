import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueFinalModal from 'vue-final-modal'


createApp(App).use(VueAxios, axios).use(VueFinalModal).use(router).mount('#app')
