<script setup>
    import AboutPage from "@/pages/AboutPage.vue";
    import ResumePage from "@/pages/ResumePage.vue";
    import ProjectPage from "@/pages/ProjectPage.vue";
    import FooterPage from "@/components/FooterPage.vue";
</script>
<template>
     <main  data-bs-spy="scroll" data-bs-target="#navbar" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true"  tabindex="0">
        <AboutPage />
        <ResumePage />
        <ProjectPage />
        <FooterPage />
    </main>
</template>