<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-events="true">
      <div class="min-h-screen flex flex-col bg-background dark:bg-[#070c14] text-on-surface dark:text-gray-100 font-body-lg antialiased relative transition-colors duration-200">
        <app-header />
        <side-nav />
        
        <main class="w-full mx-auto flex-grow">
          <home-hero :website-url="mainWebsiteUrl" />
          
          <div class="max-w-container-max mx-auto px-gutter pt-6 md:pt-8 pb-xl md:pb-2xl">
            <service-cards-section />
            <platform-cards-section />
          </div>
        </main>
        
        <home-footer :website-url="mainWebsiteUrl" />
        <scroll-to-top />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { onMounted } from 'vue';
import { useApp } from '../composables/useApp';
import AppHeader from '../modules/home/components/AppHeader.vue';
import HomeFooter from '../modules/home/components/HomeFooter.vue';
import HomeHero from '../modules/home/components/HomeHero.vue';
import PlatformCardsSection from '../modules/home/components/PlatformCardsSection.vue';
import ScrollToTop from '../modules/home/components/ScrollToTop.vue';
import ServiceCardsSection from '../modules/home/components/ServiceCardsSection.vue';
import SideNav from '../modules/home/components/SideNav.vue';
import { mainWebsiteUrl } from '../modules/home/data';

const { isDark } = useApp();

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
});
</script>

<style scoped>
ion-content {
  --background: var(--background, #f9f9ff);
}

:root.dark ion-content,
.dark ion-content {
  --background: #070c14;
}
</style>
