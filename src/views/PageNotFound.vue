<script setup>
import { useThemeStore } from '@/stores/theme';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
const themeStore = useThemeStore()
</script>

<template>
    <Header/>
    <div class="parentDiv">
            <h1>Error 404 : Page Not Found</h1>
        <Footer/>
    </div>
</template>

<style scoped>
.parentDiv {
   
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    text-align: center;
}




button {
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    font-size: large;
} 

:root[data-mdc-theme='dark'] button {
    color: white;
}


@media screen and (max-width:630px) {
    h1 {
        font-size: x-large;
    }
}
</style>