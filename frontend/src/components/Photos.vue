<template>
    <div class="photos-container" v-if="photo">
        <div class="carousel-container">
            <Carousel :settings="settings">
                <Slide v-for="(photo, idx) in photos" :key="idx">
                    <img ref="large_image_ref" class="photos__image" :src="photo.photo" />
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>  
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: 'Photos',
    props: ['propertyData'],
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation
    },
    data() {
        return {
            photo_idx: 0,
            Nthumbs: 4,
            thumb_horiz_margin: 4,
            large_image_width: undefined,
            thumb_width: undefined,
            settings: {
                itemsToShow: 1,
                wrapAround: true,
                snapAlign: 'center',
                transition: 500
            },
            left_arrow_element: undefined,
            right_arrow_element: undefined,
        }
    },
    mounted() {
        this.left_arrow_element = document.querySelector('.carousel__prev')
        this.right_arrow_element = document.querySelector('.carousel__next')
    },
    updated() {
        this.left_arrow_element = document.querySelector('.carousel__prev')
        this.right_arrow_element = document.querySelector('.carousel__next')
    },
    computed: {
        property() {
            return this.propertyData ? this.propertyData : undefined
        },
        photos() {
            if (!this.property || !('media' in this.property) || !('photos' in this.property.media))
                return []
            return this.property ? this.property.media.photos : []
        },
        photo() {
            return this.photos.length ? this.photos[this.photo_idx] : undefined
        },
    },
    methods: {
        handleLeftArrowClick() {
            if (this.photos.length > 0) {
                this.photo_idx = (this.photo_idx - 1) >= 0 ? this.photo_idx - 1 : this.photos.length - 1
            }
            else {
                this.photo_idx = 0
            }
        },
        handleRightArrowClick() {
            if (this.photos.length > 0) {
                this.photo_idx = (this.photo_idx + 1) <= this.photos.length - 1 ? this.photo_idx + 1 : 0
            }
            else {
                this.photo_idx = 0
            }
        }
    },
    watch: {
        left_arrow_element(val) {
            if (val) {
                val.style.backgroundColor = 'lightseagreen'
            }
        },
        right_arrow_element(val) {
            if (val) {
                val.style.backgroundColor = 'lightseagreen'
            }
        },
    }
}
</script>

<style scoped>

.photos-container {
    width: 100%;
}

.carousel-container {
    width: 100%;
    padding: 35px 20px;
    height: 100%;
    position: relative;
}

.photo-container {
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.photos__image {
    width: 100%;
    border-radius: 9px;
}

.arrow-btn {
    cursor: pointer;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 35px;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.2s;
}

.arrow-btn-left {
    position: absolute;
    top: 40%;
    left: 4%;
}

.arrow-btn-right {
    position: absolute;
    top: 40%;
    right: 4%;
}

.arrow-btn:hover {
    color: crimson;
}

.arrow-btn:active {
    color: lime;
}

.thumbs-container {
    display: flex;
    flex-direction: row;
}

.thumbs__image {
    border-radius: 4px;
    margin: 0 4px;
}

</style>