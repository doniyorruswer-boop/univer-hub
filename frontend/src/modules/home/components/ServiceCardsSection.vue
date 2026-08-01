<template>
  <section id="services" class="section-block">
    <div class="section-heading">
      <span class="section-kicker">{{ t.servicesKicker }}</span>
      <h2>{{ t.servicesTitle }}</h2>
      <p>{{ t.servicesDesc }}</p>
    </div>

    <div class="cards-grid cards-grid--primary">
      <a
        v-for="service in services"
        :key="service.title"
        class="service-card"
        :class="service.theme"
        :href="service.href"
        target="_blank"
        rel="noreferrer"
      >
        <div class="service-card__top">
          <div class="service-brand">
            <div class="service-logo-wrap">
              <img :src="service.logoSrc" :alt="service.title" class="service-logo-image" />
            </div>
            <div>
              <small>{{ service.logoLabel }}</small>
              <span>{{ service.tag }}</span>
            </div>
          </div>
          <ion-icon :icon="arrowForwardOutline" class="service-arrow" />
        </div>

        <h3>{{ service.title }}</h3>

        <div class="service-features">
          <span v-for="feature in service.features" :key="feature">{{ feature }}</span>
        </div>

        <div class="service-link">
          <span>{{ t.viewBtn }}</span>
          <ion-icon :icon="arrowForwardOutline" />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { arrowForwardOutline } from 'ionicons/icons';
import { useLocale } from '../../../composables/useLocale';
import type { ServiceCard } from '../types';

defineProps<{
  services: ServiceCard[];
}>();

const { t } = useLocale();
</script>

<style scoped>
@import './ServiceCardsSection.css';
</style>