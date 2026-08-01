<template>
  <ion-page>
    <ion-content :fullscreen="true" class="hub-page">
      <div class="page-wrapper">
        <div class="page-shell">
          <app-header />
        <side-nav />
        <home-hero
            :hero-points="heroPoints"
            :metrics="metrics"
            :website-url="mainWebsiteUrl"
            @start="scrollToServices"
          />

          <service-cards-section :services="services" />
          <platform-cards-section :platforms="platforms" />
        </div>
        <home-footer :website-url="mainWebsiteUrl" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { computed, onMounted } from 'vue';
import { useApp } from '../composables/useApp';
import { useLocale } from '../composables/useLocale';
import AppHeader from '../modules/home/components/AppHeader.vue';
import HomeFooter from '../modules/home/components/HomeFooter.vue';
import HomeHero from '../modules/home/components/HomeHero.vue';
import PlatformCardsSection from '../modules/home/components/PlatformCardsSection.vue';
import ServiceCardsSection from '../modules/home/components/ServiceCardsSection.vue';
import SideNav from '../modules/home/components/SideNav.vue';
import {
  heroPointIcons,
  mainWebsiteUrl,
  metricsValues,
  platformLinks,
  serviceLinks,
} from '../modules/home/data';

const { isDark } = useApp();
const { t } = useLocale();

onMounted(() => {
  // Restore persisted theme
  document.documentElement.classList.toggle('dark', isDark.value);
});

const heroPoints = computed(() =>
  heroPointIcons.map((icon, i) => ({
    icon,
    ...t.value.heroPoints[i],
  })),
);

const metrics = computed(() =>
  metricsValues.map((value, i) => ({
    value,
    label: t.value.metrics[i].label,
  })),
);

const services = computed(() =>
  serviceLinks.map((link, i) => ({
    ...link,
    ...t.value.services[i],
  })),
);

const platforms = computed(() =>
  platformLinks.map((link, i) => ({
    ...link,
    ...t.value.platforms[i],
  })),
);

const scrollToServices = () => {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.hub-page {
  --background: var(--hub-page-gradient);
  color: var(--hub-text-primary);
  font-family: 'Manrope', sans-serif;
  transition: --background 300ms;
}

.page-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.page-shell {
  position: relative;
  flex: 1;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 18px 32px;
  width: 100%;
}

.page-shell::before,
.page-shell::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  filter: blur(12px);
  pointer-events: none;
}

.page-shell::before {
  top: -120px;
  right: -80px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(48, 125, 255, 0.2) 0%, rgba(48, 125, 255, 0) 72%);
}

.page-shell::after {
  bottom: 80px;
  left: -120px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(38, 181, 116, 0.18) 0%, rgba(38, 181, 116, 0) 70%);
}

@media (max-width: 780px) {
  .page-shell {
    padding: 12px 12px 24px;
  }
}

@media (max-width: 480px) {
  .page-shell {
    padding: 8px 8px 20px;
  }
}

@media (min-width: 1400px) {
  .page-shell {
    padding: 28px 24px 40px;
  }
}
</style>
