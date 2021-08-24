<template>
    <div class="admin-media-container">
        <ul class="admin-media-photos__ul">
            <h3 class="admin-media-photos__h3">Photos</h3>
            <li v-for="(photo, idx) in photos" 
                :key="idx-1"
                class="admin-media-photos__li"
            >
                <div class="admin-media-single-photo-container">
                    <AdminInputListForm 
                        :input_object="photo" 
                        :display_labels_object="photo_display_keys" />
                </div>
            </li>
        </ul>

        <div class="floorplans-container">
            <h3 class="floorplans__h3">Floorplans</h3>
            <EmptyInputListForm :num_elements="4" />
        </div>

        <div class="photos360-container">
            <h3 class="photos360__h3">Photos 360</h3>
            <EmptyInputListForm :num_elements="4" />
        </div>

        <div class="tours-container">
            <h3 class="tours__h3">Tours</h3>
            <EmptyInputListForm :num_elements="4" />
        </div>

        <div class="videos-container">
            <h3 class="videos__h3">Videos</h3>
            <EmptyInputListForm :num_elements="4" />
        </div>
    </div>
</template>

<script>
import AdminInputListForm from './AdminInputListForm.vue'
import EmptyInputListForm from './EmptyInputListForm.vue'

export default {
    name: 'AdminMedia',
    props: ['propertiesData', 'property_id'],
    data() {
        return {
            properties: undefined,
            photo_display_keys: {
                photo: 'Photo URL',
                thumb: 'Thumbnail URL',
                caption: 'Caption'
            }
        }
    },
    components: { 
        AdminInputListForm,
        EmptyInputListForm
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
        photos() {
            try { return this.property.media.photos } catch(e) { return []}
        },
    }

}
</script>

<style scoped>

.admin-media-photos__ul {
    list-style-type: none;
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #d8d8d8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
}

.admin-media-photos__li
 {
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    background-color: #bbb;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.admin-media-photos__h3 {
    font-size: 1.3em;
    font-weight: 700;
    margin: 0px auto;
    padding: 0;
}

.floorplans-container,
.photos360-container,
.tours-container,
.videos-container {
    width: 80%;
    margin: 40px auto;
    padding: 20px;
    background-color: #d8d8d8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

</style>