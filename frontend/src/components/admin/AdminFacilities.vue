<template>
    <div class="facilities-page-container">
        <h3 class="facilities-form__h3">Facilities</h3> 
        <div class="facilities-form-container">
            <form @submit.prevent="handleSubmit">
                <div v-for="(val, idx) in facilities_list" :key="idx" class="facilities-form__row">
                    <input class="facilities-form__input" type="text" :name="val" :value="val">
                </div>
                <!-- <button type="submit" class="facilities-form__submit-button">Update</button> -->
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AdminFacilities',
    props: ['propertiesData', 'property_id'],
    data() {
        return {
            properties: undefined
        }
    },
    mounted() {
        if (this.propertiesData) {
            this.properties = JSON.parse(this.propertiesData)
        }
    },
    updated() {
        if (!this.properties && this.propertiesData) {
            this.properties = this.propertiesData ? JSON.parse(this.propertiesData) : undefined
        }
    },
    computed: {
        property() {
            try { return this.properties.find(property => property.property_id === this.property_id) }
            catch(e) { return undefined }
        },
        facilities_list() {
            return this.property ? this.property.facilities : undefined
        }
    }
}
</script>

<style>

.facilities-page-container {
    width: 45%;
    background-color: #ccc;
    margin: 10px;
    padding: 15px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.facilities-form__h3 {
    display: block;
    font-size: 1.2em;
    font-weight: 600;
    text-align: left;
    padding: 5px 0;
    margin: 5px 0;
}


.facilities-form__input {
    display: block;
    width: 80%;
    margin: 5px auto;
    padding: 5px;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8em;
    text-align: left;
    box-sizing: border-box;
    height: 2em;
}

.facilities-form__input {
    border: 1px solid #ccc;
    border-radius: 8px;
}

.facilities-form__input:focus {
    outline: none;
    border: none;
    box-shadow: var(--orangey-red-color) 0px 0px 2px 2px;
}


</style>

