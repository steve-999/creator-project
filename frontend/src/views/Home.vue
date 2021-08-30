<template>
    <div class="home-container fadeInAnimation" v-if="properties && properties.length">
        <div class="properties-container" v-for="property in properties" :key="property.property_id">
            <PropertySummary :propertyData="property" />
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import { BASE_API_URL } from '../environment/environment.js'
//const BASE_API_URL = 'http://localhost:5000/api'
//const BASE_API_URL = 'https://creator-project-e5c73.ondigitalocean.app/api'
import PropertySummary from '../components/PropertySummary.vue'

export default {
    name: 'Home',
    props: ['properties'],
    components: {
        PropertySummary
    },
    // data() {
    //     return {  
    //         properties: null  
    //     }
    // },
    // async created() {
    //     const url = `${BASE_API_URL}/properties`;
    //     try {
    //         const resp = await axios.get(url);
    //         this.properties = resp.data
    //     }
    //     catch(err) {
    //         console.log(err.message);
    //     }        
    // },
}
</script>

<style scoped>

.home-container {
    width: 100%;
}

.properties-container {
    width: 85%;
    max-width: 900px;
    height: 100%;
    margin: 50px auto;
}

</style>