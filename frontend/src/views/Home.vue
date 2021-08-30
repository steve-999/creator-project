<template>
    <div class="home-container fadeInAnimation" v-if="properties && properties.length">
        <div class="properties-container" v-for="property in properties" :key="property.property_id">
            <PropertySummary :propertyData="property" />
        </div>
    </div>
</template>

<script>
import PropertySummary from '../components/PropertySummary.vue'

export default {
    name: 'Home',
    props: ['properties'],
    components: {
        PropertySummary
    },
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