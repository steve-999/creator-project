import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { 
    faBath, 
    faCouch, 
    faBed, 
    faArrowLeft, 
    faArrowRight, 
    faCheck, 
    faTimes, 
    faMapMarker, 
    faCalendarAlt,
    faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBath, faCouch, faBed, faArrowLeft, faArrowRight, faCheck, faTimes, faMapMarker, faCalendarAlt, faHome);

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
