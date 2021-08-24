<template>
    <div class="admin-property-info-container">
      
            <div class="components-container">
                <div class="top-component-container">
                    <AdminInputListForm 
                        heading="Details"
                        :input_object="top_list_input_object"
                        :display_labels_object="top_list_display_labels_obj" 
                    />   
                </div>   
                <div class="description-container" v-if="description">
                    <h3 class="description__h3">Description</h3>
                    <form @submit.prevent="handleDescriptionSubmit">
                        <textarea 
                            name="description" 
                            :value="description"
                            class="description__textarea">
                        </textarea>
                    </form>
                </div>
                <div class="address-component-container">
                    <AdminInputListForm 
                        heading="Address" 
                        :input_object="address_input_object"
                        :display_labels_object="address_display_labels_obj" 
                    />
                </div>
                <AdminFacilities
                    :propertiesData="propertiesData"
                    :property_id="property_id"
                />
                <AdminEligibility
                    :propertiesData="propertiesData"
                    :property_id="property_id"
                />
                <AdminEnergyPerformance
                    :propertiesData="propertiesData"
                    :property_id="property_id"
                />
            </div>
        </div>
</template>

<script>
import AdminInputListForm from './AdminInputListForm.vue'
import AdminFacilities from './AdminFacilities.vue'
import AdminEligibility from './AdminEligibility.vue'
import AdminEnergyPerformance from './AdminEnergyPerformance.vue'

export default {
    name: 'AdminPropertyInfo',
    props: ['propertiesData', 'property_id'],
    components: {
        AdminInputListForm,
        AdminFacilities,
        AdminEligibility,
        AdminEnergyPerformance
    },
    data() {
        return {
            properties: undefined,
            address_display_labels_obj: {
                property_name: 'Property name',
                property_number: 'Property number',
                road_name: 'Road name',
                city: 'City',
                postcode: 'Postcode',
                country: 'Country',
                uprn: 'UPRN'
            },
            top_list_display_labels_obj: {
                room_type: 'Room type',
                bathrooms: 'Bathrooms',
                bank_id: 'Bank ID',
                cluster_size: 'Cluster size',
                designation: 'Designation',
                disabled: 'Disabled',
                floor_space: 'Floor space',
                property_id: 'Property ID',
                quantity: 'Quantity',
                quantity_available: 'Quantity available',
                rooms_let_individually: 'Rooms let individually'
            }
        }
    },
    mounted() {
        this.properties = this.propertiesData ? JSON.parse(this.propertiesData) : undefined
    },
    updated() {
        if (!this.properties && this.propertiesData) {
            this.properties = this.propertiesData ? JSON.parse(this.propertiesData) : undefined
        }
    },
    computed: {
        property() {
            try {
                return this.properties.find(property => property.property_id === this.property_id)
            }
            catch(e) {
                return undefined
            }
        },
        address_input_object() {
            return this.property ? this.property.address : undefined
        },
        top_list_input_object() {
            if(!this.property) 
                return undefined
            const d = {}
            Object.keys(this.top_list_display_labels_obj).forEach(key => d[key] = this.property[key])
            return d
        },
        description() {
            return this.property ? this.property.description : undefined
        }
    }
}
</script>

<style>

.admin-property-info-container {
    width: 100%;
}

.top-component-container {
    width: 45%;
    background-color: #ccc;
    margin: 10px;
    padding: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; 
}

.components-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.address-component-container {
    width: 45%;
    background-color: #ccc;
    margin: 10px;
    padding: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.description-container {
    width: 45%;
    background-color: #ccc;
    margin: 10px;
    padding: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.description__h3 {
    font-size: 1.2em;
    font-weight: 600;
    text-align: left;
    padding: 5px 0;
    margin: 5px 0;
}

.description__textarea {
    width: 95%;
    height: 45vh;
    padding: 5px;
    margin: 2px auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.9em;
    color: #333;
    border: none;
    text-align: left;
    box-sizing: border-box;
    border-radius: 12px;
}


</style>




