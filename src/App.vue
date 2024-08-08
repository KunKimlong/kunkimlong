<script setup>
    import HeaderPage from "@/components/HeaderPage.vue"
    // import MainPage from "@/components/MainPage.vue"
    import FooterPage from "@/components/FooterPage.vue"
    import { RouterView } from "vue-router";
</script>

<template>
    <HeaderPage />
    <RouterView />
    <FooterPage />
</template>

