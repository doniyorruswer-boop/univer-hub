<template>
  <section id="platforms" class="section-block section-block--compact">
    <div class="section-heading section-heading--compact">
      <span class="section-kicker">{{ t.platformsKicker }}</span>
      <h2>{{ t.platformsTitle }}</h2>
      <p>{{ t.platformsDesc }}</p>
    </div>

    <div class="cards-grid cards-grid--secondary">
      <a
        v-for="platform in platforms"
        :key="platform.title"
        class="platform-card"
        :class="platform.theme"
        :href="platform.href"
        target="_blank"
        rel="noreferrer"
      >
        <div class="platform-card__media">
          <img :src="platform.logoSrc" :alt="platform.title" class="platform-logo-image" />
        </div>
        <div class="platform-card__copy">
          <span>{{ platform.tag }}</span>
          <h3>{{ platform.title }}</h3>
          <p>{{ platform.description }}</p>
        </div>
        <ion-icon class="platform-card__arrow" :icon="openOutline" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { openOutline } from 'ionicons/icons';
import { useLocale } from '../../../composables/useLocale';
import type { PlatformCard } from '../types';

defineProps<{
  platforms: PlatformCard[];
}>();

const { t } = useLocale();
</script>

<style scoped>
@import './PlatformCardsSection.css';
</style>