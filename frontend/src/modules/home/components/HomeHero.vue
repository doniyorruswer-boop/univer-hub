<template>
  <section id="hero" class="hero-section">
    <div class="hero-copy">
      <span class="eyebrow">{{ t.eyebrow }}</span>
      <h1>{{ t.heroTitle }}</h1>
      <p class="hero-tagline">{{ t.heroTagline }}</p>
      <p class="hero-text">{{ t.heroText }}</p>

      <div class="hero-actions">
        <button class="primary-action" type="button" @click="$emit('start')">
          {{ t.startBtn }}
        </button>
        <a :href="websiteUrl" target="_blank" rel="noreferrer" class="secondary-action">
          {{ t.mainSiteBtn }}
          <ion-icon :icon="openOutline" />
        </a>
      </div>

      <div class="hero-points">
        <div v-for="point in heroPoints" :key="point.title" class="point-card">
          <div class="point-icon">
            <ion-icon :icon="point.icon" />
          </div>
          <div>
            <strong>{{ point.title }}</strong>
            <span>{{ point.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-panel">
      <div class="hero-panel__surface">
        <div class="panel-topline">
          <span class="panel-chip">{{ t.panelChip }}</span>
          <span class="panel-status">{{ t.panelStatus }}</span>
        </div>

        <div class="hero-logo-wrap">
          <div class="logo-ring logo-ring--outer"></div>
          <div class="logo-ring logo-ring--mid"></div>
          <div class="logo-ring logo-ring--inner"></div>
          <div class="hero-logo-glow"></div>
          <div class="hero-logo-frame">
            <img class="hero-logo" src="/logo-namdtu.jpeg" alt="NamDTU logo" />
          </div>
        </div>

        <div class="hero-metrics" ref="metricsEl">
          <div v-for="(metric, i) in metrics" :key="metric.label" class="metric-card">
            <strong>{{ displayValues[i] ?? metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <div class="panel-feedback">
        <span class="panel-feedback__label">{{ t.feedbackLabel }}</span>
        <a
          href="https://t.me/o1bragimov"
          target="_blank"
          rel="noreferrer"
          class="panel-feedback__btn"
        >
          <svg class="tg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.656l-2.96-.924c-.643-.203-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.838.903z"/>
          </svg>
          @o1bragimov
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { openOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useLocale } from '../../../composables/useLocale';
import type { HeroPoint, Metric } from '../types';

defineEmits<{ start: [] }>();

const props = defineProps<{
  heroPoints: HeroPoint[];
  metrics: Metric[];
  websiteUrl: string;
}>();

const { t } = useLocale();

const metricsEl = ref<HTMLElement | null>(null);
const displayValues = ref<string[]>([]);

function parseMetric(val: string) {
  const num = parseInt(val.replace(/\D/g, ''), 10) || 0;
  const suffix = val.replace(/[0-9]/g, '');
  return { num, suffix };
}

onMounted(() => {
  displayValues.value = props.metrics.map((m) => {
    const { suffix } = parseMetric(m.value);
    return `0${suffix}`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      props.metrics.forEach((m, i) => {
        const { num, suffix } = parseMetric(m.value);
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - elapsed, 3);
          displayValues.value[i] = `${Math.round(ease * num)}${suffix}`;
          if (elapsed < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 },
  );

  if (metricsEl.value) observer.observe(metricsEl.value);
});
</script>

<style scoped>
@import './HomeHero.css';
</style>