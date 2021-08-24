<template>
    <div class="admin-contracts-container" v-if="property">
        <div class="admin-contracts-container">
            <ul class="admin-contracts__ul">
                <li 
                    v-for="idx in num_contracts" 
                    :key="idx-1"
                    class="admin-contracts__li"
                >
                    <h2 class="admin-contracts__h2--top">Contract {{ idx }}</h2>
                    <div class="admin-contracts-main-info-and-utilities-container">
                        <div class="admin-contracts-main-contracts-info-container">
                            <AdminInputListForm 
                                :input_object="create_main_contract_info_object(idx-1)" 
                                :display_labels_object="main_contract_display_keys" />
                        </div>

                        <div class="admin-contracts-utilities-container">
                            <AdminEditBooleanList
                                :input_object="create_utilities_info_object(idx-1)" 
                                :display_labels_object="utilities_display_keys" />    
                        </div>    
                    </div>      
                    <h3 class="admin-contracts__h3">Room prices</h3>          
                    <ul class="admin-contracts-room-prices__ul">
                        <li 
                            v-for="idx_2 in property.contracts[idx-1].prices.length" 
                            :key="idx_2-1"
                            class="admin-contracts-room-prices__li"
                        >
                            <div class="admin-contracts-room-prices-container">
                                <AdminInputListForm 
                                    :input_object="create_room_prices_info_object(idx-1, idx_2-1)" 
                                    :display_labels_object="room_prices_display_keys" />
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import AdminInputListForm from './AdminInputListForm.vue'
import AdminEditBooleanList from './AdminEditBooleanList.vue'
// 'heading', 'input_object', 'display_labels_object'

export default {
    name: 'AdminContracts',
    props: ['propertiesData', 'property_id'],
    components: {
        AdminInputListForm,
        AdminEditBooleanList
    },
    data() {
        return {
            properties: undefined,
            main_contract_display_keys: {
                title: 'Title',
                book_now_url: 'Book now URL',
                start_date: 'Start date',
                end_date: 'End date',
                min_contract_days: 'Minimum contract days',
            },
            utilities_display_keys: {
                broadband: 'Broadband',
                contents_insurance: 'Contents insurance',
                council_tax: 'Council tax',
                electricity: 'Electricity',
                gas: 'Gas',
                phone: 'Phone',
                tv_license: 'TV licence',
                water: 'Water'
            },
            room_prices_display_keys: {
                room_name: 'Room name',
                price_per_person_per_week: 'Price per person per week',
                deposit_per_person: 'Deposit per person',
                fee_per_person: 'Fee per person'
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
            try { return this.properties.find(property => property.property_id === this.property_id) }
            catch(e) { return undefined }
        },
        contracts() {
            try { return this.property.contracts } catch(e) { return undefined}
        },
        num_contracts() {
            try { return this.contracts.length } catch(e) { return undefined}
        }
    },
    methods: {
        create_main_contract_info_object(contract_idx) {
            try {
                const d = {}
                const contract = this.property.contracts[contract_idx]
                Object.keys(this.main_contract_display_keys).forEach(key => d[key] = contract[key])
                return d
            }
            catch(e) {
                return undefined
            }
        },
        create_utilities_info_object(contract_idx) {
            return this.property.contracts[contract_idx] ? this.property.contracts[contract_idx].utilities : undefined       
        },
        create_room_prices_info_object(contract_idx, room_idx) {
            return this.property.contracts[contract_idx].prices[room_idx]
        }
    }
}
</script>

<style>

.admin-edit-container {
    background-color: #f8f8f8;
}

.admin-contracts__ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.admin-contracts__li {
    width: 90%;
    margin: 30px auto;
    padding: 20px;
    background-color: #d8d8d8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.admin-contracts-main-info-and-utilities-container {
    display: flex;
    flex-direction: row;
}

.admin-contracts-main-contracts-info-container {
    width: 45%;
    margin: 30px auto;
    padding: 20px;
    background-color: #bbb;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.admin-contracts-utilities-container {
    width: 45%;
    margin: 30px auto;
    padding: 20px;
    background-color: #bbb;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.admin-contracts-room-prices__ul {
    list-style-type: none;
    margin: 0;
    padding: 0;    
    display: flex;
    flex-flow: row wrap;
}

.admin-contracts-room-prices__li {
    width: 45%;
    margin: 30px auto;
    padding: 20px;
    background-color: #bbb;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;    
}

.admin-contracts__h2--top {
    font-size: 1.4em;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
}

.admin-contracts__h3 {
    font-size: 1.2em;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
}

</style>