<template>
    <div class="app-container">
        <Header/>
        <router-view :properties="properties" />
        <Footer/>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_API_URL } from './environment/environment.js'

import Header from './views/Header.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    components: { 
        Header,
        Footer 
    }, 
    
    data() {
        return {  
            properties: null  
        }
    },
    async created() {
        const url = `${BASE_API_URL}/properties`;
        try {
            const resp = await axios.get(url);
            this.properties = resp.data
        }
        catch(err) { console.log(err.message) }        
    },
}
</script>


<style>   /* GLOBAL STYLES */

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');


body {
  margin: 0;
  padding: 0;
  --orangey-red-color: rgb(238, 83, 55)
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fadeInAnimation {
  animation: fadeIn ease-in 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.DisplayBooleanList__outer-list-container {
    width: 100%;
}

.DisplayBooleanList__h2 {
    color: darkslateblue;
    font-size: 1.75em;
    margin: 30px 0 30px 6%;
    text-align: left;
}

.DisplayBooleanList__list-container {
    width: 100%;
}

.DisplayBooleanList__list__ul {
    width: 94%;
    margin: 0 0 0 6%;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
}

.DisplayBooleanList__list__li {
    width: 31%;
    margin-top: 35px;
    text-align: left;
    font-size: 0.95em;
    font-weight: 600;
}

.DisplayBooleanList__list__li .icon {
    font-size: 0.8em;
    margin-right: 15px;
}


.DisplayListForObject__outer-list-container {
    width: 100%;
}

.DisplayListForObject__h2 {
    color: darkslateblue;
    font-size: 1.75em;
    margin: 30px 0 30px 6%;
    text-align: left;
}

.DisplayListForObject__list-container {
    width: 100%;
}

.DisplayListForObject__list__ul {
    width: 94%;
    margin: 0 0 0 6%;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
}

.DisplayListForObject__list__li {
    width: 31%;
    margin-top: 35px;
    text-align: left;
}

.DisplayListForObject__span-text, 
.DisplayListForObject__span-value {
    display: inline-block;
    text-align: left;
    font-size: 0.95em;
    font-weight: 600;
}

.DisplayListForObject__span-text {
    min-width: 60%;
}

</style>
