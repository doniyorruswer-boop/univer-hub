<template>
  <ion-page>
    <side-nav />
    <ion-content :fullscreen="true" :scroll-events="true">
      <div class="min-h-screen flex flex-col bg-background dark:bg-[#070c14] text-on-surface dark:text-gray-100 font-body-lg antialiased relative">
        <app-header />
        
        <!-- OAuth Processing Banner -->
        <div v-if="oauthStatus" class="fixed top-20 right-4 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center gap-3 animate-fade-in">
          <span class="material-symbols-outlined text-xl">fingerprint</span>
          <span class="text-xs font-bold">{{ oauthStatus }}</span>
        </div>

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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApp } from '../composables/useApp';
import { useAuth } from '../composables/useAuth';
import AppHeader from '../modules/home/components/AppHeader.vue';
import HomeFooter from '../modules/home/components/HomeFooter.vue';
import HomeHero from '../modules/home/components/HomeHero.vue';
import PlatformCardsSection from '../modules/home/components/PlatformCardsSection.vue';
import ScrollToTop from '../modules/home/components/ScrollToTop.vue';
import ServiceCardsSection from '../modules/home/components/ServiceCardsSection.vue';
import SideNav from '../modules/home/components/SideNav.vue';
import { mainWebsiteUrl } from '../modules/home/data';

const { isDark } = useApp();
const { loginWithOAuthCode } = useAuth();
const route = useRoute();
const router = useRouter();

const oauthStatus = ref<string | null>(null);

onMounted(async () => {
  document.documentElement.classList.toggle('dark', isDark.value);

  // Handle HEMIS OAuth Callback code if present in URL
  const code = route.query.code as string;
  if (code) {
    oauthStatus.value = "OneID / HEMIS OAuth orqali avtorizatsiya bajarilmoqda...";
    const success = await loginWithOAuthCode(code);
    if (success) {
      oauthStatus.value = "OneID orqali muvaffaqiyatli kirdingiz!";
      setTimeout(() => {
        oauthStatus.value = null;
      }, 3500);
    } else {
      oauthStatus.value = null;
    }
    router.replace({ path: '/home', query: {} });
  }
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
