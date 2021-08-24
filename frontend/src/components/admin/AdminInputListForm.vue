<template>
    <div class="admin-input-list-form-container" v-if="input_object">
        <h3 class="admin-input-list-form__h3" v-if="heading">{{ heading }}</h3>
        <form @submit.prevent="handleSubmit">
            <div v-for="key in keys_list" :key="key" class="admin-input-list-form__row">
                <label class="admin-input-list-form__label">{{ display_labels_object[key] }}</label>
                <input class="admin-input-list-form__input" type="text" :name="key" :value="input_object[key]">
            </div>
            <!-- <button type="submit" class="admin-input-list-form__submit-button">Update</button> -->
        </form>
    </div>
</template>

<script>
export default {
    name: 'AdminInputListForm',
    props: ['heading', 'input_object', 'display_labels_object'],
    methods: {
        handleSubmit(e) {
            const values = Object.fromEntries(new FormData(e.target))
        }
    },
    computed: {
        keys_list() {
            return this.display_labels_object ? Object.keys(this.display_labels_object) : []
        }
    }
}
</script>

<style>

.admin-property-info-container {
    padding: 20px;
}

.admin-input-list-form__h3 {
    font-size: 1.2em;
    font-weight: 600;
    text-align: left;
    padding: 5px 0;
    margin: 5px 0;
}

.admin-input-list-form__label,
.admin-input-list-form__input {
    display: inline-block;
    padding: 5px;
    margin: 2px auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8em;
    text-align: left;
    box-sizing: border-box;
    height: 2em;
}

.admin-input-list-form__label {
    width: 50%;
}

.admin-input-list-form__input {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 50%;
}

.admin-input-list-form__input:focus {
    outline: none;
    border: none;
    box-shadow: var(--orangey-red-color) 0px 0px 2px 2px;
}

</style>
