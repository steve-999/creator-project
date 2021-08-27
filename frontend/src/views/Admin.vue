<template>
    <div class="admin-page-container" v-if="properties">
        <div class="select-property-container">
            <button class="select-property__button" @click="handleClickOpenModal">Select a property to edit</button>
            <SelectPropertyModal 
                :propertiesData="properties" 
                :show_modal="show_modal" 
                @handleSelectPropertyClick="handleSelectPropertyClick" 
                @closeModal="closeModal"
            />
            <div class="selected-property__div" v-show="selected_property_id">Selected property: {{ selected_property_string }}</div>
        </div>

        <div class="admin-content-container">
            <div class="tabs-container">
                <ul class="tabs__ul">
                    <div 
                        v-for="idx in tabs.length" 
                        :key="idx" 
                        class="tabs__li" 
                        @click="handleClickTab(tabs[idx-1].route_name)"
                        :ref="tabs[idx-1].route_name"
                    >
                        <li class="tab">{{ tabs[idx-1].text }}</li>
                    </div>
                </ul>
            </div>
            <div class="admin-edit-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_API_URL } from '../environment/environment.js'
//const BASE_API_URL = 'http://localhost:5000/api'
//const BASE_API_URL = 'https://creator-project-e5c73.ondigitalocean.app/api'
import SelectPropertyModal from '../components/admin/SelectPropertyModal.vue'
import { 
    create_address_string, 
    get_num_rooms, 
    get_num_bathrooms,
    pluralise_word_for_num 
} from '../shared/shared_code.js'

export default {
    name: 'Admin',
    data() {
        return {
            properties: undefined,
            show_modal: true, 
            selected_property_id: undefined,
            tabs: [
                { text: 'Property Info',    route_name: 'AdminPropertyInfo'},
                { text: 'Room Details',     route_name: 'AdminRoomDetails'},
                { text: 'Contracts',        route_name: 'AdminContracts'},
                { text: 'Media',            route_name: 'AdminMedia' },
            ]
        }
    },
    components: {
        SelectPropertyModal
    },
    async created() {
        const url = `${BASE_API_URL}/properties`;
        try {
            const resp = await axios.get(url);
            this.properties = resp.data
        }
        catch(err) {
            console.log(err.message);
        }        
    },
    computed: {
        property() {
            return this.propertyData ? this.propertyData : undefined
        },
        selected_property_string() {
            if (!this.selected_property_id)
                return undefined
            const property = this.properties.find(property => property.property_id == this.selected_property_id)
            const address_string = create_address_string(property)
            const property_title = property.room_type
            const num_bedrooms = get_num_rooms(property)
            const num_bathrooms = get_num_bathrooms(property)
            const num_bedrooms_string = pluralise_word_for_num('bedroom', num_bedrooms)
            const num_bathrooms_string = pluralise_word_for_num('bathroom', num_bathrooms)
            return `${property_title}, ${address_string}, ${num_bedrooms} ${num_bedrooms_string}, ${num_bathrooms} ${num_bathrooms_string}`
        }
    },
    methods: {
        handleSelectPropertyClick(property_id) {
            this.selected_property_id = property_id
            this.show_modal = false
            this.$router.push({ name: 'AdminPropertyInfo', params: { propertiesData: JSON.stringify(this.properties),
                                                                     property_id: this.selected_property_id } })
            this.tabs.forEach(tab => this.$refs[tab.route_name].classList.remove('active_tab'))
            this.$refs['AdminPropertyInfo'].classList.add('active_tab')
        },
        handleClickOpenModal() {
            this.show_modal = true
        },
        handleClickTab(route_name) {
            if (!this.selected_property_id) {
                alert('Please select a property to edit')
                return
            }
            this.$router.push({ name: route_name, params: { propertiesData: JSON.stringify(this.properties),
                                                            property_id: this.selected_property_id } })
            this.tabs.forEach(tab => this.$refs[tab.route_name].classList.remove('active_tab'))
            this.$refs[route_name].classList.add('active_tab')
        },
        closeModal() {
            this.show_modal = false
        }
    }
}
</script>

<style scoped>

.page-heading-table,
.page-heading-table td {
    border: 1px solid grey;
}

.admin-page-container {
    width: 100%;
}

.admin-content-container {
    width: 90%;
    margin: 0 auto;
}

.selected-property__div {
    font-size: 0.95em;
    padding: 8px 0;
}

/******************************************************/

.tabs-container {
    margin: 0 auto;
}

.tabs__ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;
    margin: 0;
}

.tabs__li {
    display: inline-block;
    margin: 0 1px;
    padding: 7px 8px;
    background-color: rgb(118, 105, 207);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    color: white;
    font-size: 1em;
    font-weight: 400;
    cursor: pointer;
    transition: 0.2s;
}

.tabs__li:hover {
    background-color: mediumorchid;
}

.active_tab {
    background-color: var(--orangey-red-color);
}

.admin-edit-container {
    width: 90%;
    margin: 0 auto 60px auto;
    border: 2px solid #dcdcdc;
    border-radius: 15px;
    background-color: #f4f4f4;
    min-height: 500px;
}

/* .tabs__li .tab.router-link-exact-active {
    color: yellow;
}  */

</style>


