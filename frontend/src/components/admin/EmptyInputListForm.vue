<template>
    <div class="empty-input-list-form-container">
        <form>
            <ul class="empty-input-list-form__ul" v-if="num_elements">
                <li v-for="idx in num_elements" :key="idx-1" class="empty-input-list-form__li">
                    <input class="empty-input-list-form__input" type="text" :name="idx-1" value="">
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EmptyInputListForm',
    props: ['num_elements']
}
</script>

<style>

.empty-input-list-form__ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.empty-input-list-form__input {
    display: inline-block;
    padding: 5px;
    margin: 2px auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8em;
    text-align: left;
    box-sizing: border-box;
    height: 2em;
}

.empty-input-list-form__input {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 80%;
}

.empty-input-list-form__input:focus {
    outline: none;
    border: none;
    box-shadow: var(--orangey-red-color) 0px 0px 2px 2px;
}

</style>