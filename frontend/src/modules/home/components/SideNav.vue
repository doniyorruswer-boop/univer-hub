<template>
  <nav class="side-nav" aria-label="Section navigation">
    <ul>
      <li
        v-for="item in navItems"
        :key="item.id"
        :class="{ active: activeId === item.id }"
      >
        <a :href="`#${item.id}`" :title="item.label" @click.prevent="scrollTo(item.id)">
          <span class="dot">
            <ion-icon :icon="item.icon" />
          </span>
          <span class="label">{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { chatbubblesOutline, gridOutline, homeOutline } from 'ionicons/icons';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useLocale } from '../../../composables/useLocale';

const { t } = useLocale();

const navItems = computed(() => [
  { id: 'hero', icon: homeOutline, label: t.value.navHome },
  { id: 'platforms', icon: gridOutline, label: t.value.navPlatforms },
  { id: 'services', icon: chatbubblesOutline, label: t.value.navServices },
]);

const activeId = ref<string>('hero');

let isProgrammaticScroll = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
let ionContentEl: Element | null = null;

function scrollTo(id: string) {
  activeId.value = id;
  isProgrammaticScroll = true;

  if (scrollTimeout) clearTimeout(scrollTimeout);

  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const content = document.querySelector('ion-content');
    if (content && (content as any).scrollToTop) {
      (content as any).scrollToTop(400);
    }
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll = false;
  }, 800);
}

let scrollInnerEl: Element | null = null;

function handleScrollCheck() {
  if (isProgrammaticScroll) return;

  const heroEl = document.getElementById('hero');
  const platformsEl = document.getElementById('platforms');
  const servicesEl = document.getElementById('services');

  const navThreshold = 220;

  if (servicesEl) {
    const sRect = servicesEl.getBoundingClientRect();
    if (sRect.top <= navThreshold && sRect.bottom > 100) {
      activeId.value = 'services';
      return;
    }
  }

  if (platformsEl) {
    const pRect = platformsEl.getBoundingClientRect();
    if (pRect.top <= navThreshold && pRect.bottom > 120) {
      activeId.value = 'platforms';
      return;
    }
  }

  if (heroEl) {
    const hRect = heroEl.getBoundingClientRect();
    if (hRect.bottom > navThreshold) {
      activeId.value = 'hero';
      return;
    }
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScrollCheck, { passive: true });
  document.addEventListener('scroll', handleScrollCheck, { passive: true });

  ionContentEl = document.querySelector('ion-content');
  if (ionContentEl) {
    ionContentEl.addEventListener('ionScroll', handleScrollCheck as any);
    ionContentEl.addEventListener('scroll', handleScrollCheck, { passive: true });

    if ((ionContentEl as any).getScrollElement) {
      scrollInnerEl = await (ionContentEl as any).getScrollElement();
      if (scrollInnerEl) {
        scrollInnerEl.addEventListener('scroll', handleScrollCheck, { passive: true });
      }
    }
  }

  setTimeout(handleScrollCheck, 200);
});

onBeforeUnmount(() => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  window.removeEventListener('scroll', handleScrollCheck);
  document.removeEventListener('scroll', handleScrollCheck);
  if (ionContentEl) {
    ionContentEl.removeEventListener('ionScroll', handleScrollCheck as any);
    ionContentEl.removeEventListener('scroll', handleScrollCheck);
  }
  if (scrollInnerEl) {
    scrollInnerEl.removeEventListener('scroll', handleScrollCheck);
  }
});
</script>

<style scoped>
.side-nav {
  position: fixed;
  left: 18px;
  top: 50%;
  transform: translateY(-50%) translateZ(0);
  -webkit-transform: translateY(-50%) translateZ(0);
  will-change: transform;
  z-index: 100;
  pointer-events: none;
}

.side-nav ul {
  list-style: none;
  margin: 0;
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  pointer-events: auto;
}

.side-nav ul::before {
  content: '';
  position: absolute;
  left: 37px;
  top: 36px;
  bottom: 36px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(90, 140, 220, 0.35) 12%,
    rgba(90, 140, 220, 0.35) 88%,
    transparent
  );
  z-index: 0;
}

.side-nav a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--hub-text-muted);
  font-size: 0.95rem;
  font-weight: 600;
}

.dot {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--hub-card-bg, #ffffff);
  border: 2px solid rgba(120, 160, 220, 0.45);
  color: var(--hub-text-muted);
  box-shadow: 0 3px 14px rgba(30, 60, 120, 0.1);
  flex-shrink: 0;
}

.dot ion-icon {
  font-size: 1.45rem;
}

.label {
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 150ms ease, transform 150ms ease;
  white-space: nowrap;
  padding: 7px 16px;
  border-radius: 12px;
  background: var(--hub-card-bg, #ffffff);
  border: 1px solid var(--hub-border);
  box-shadow: 0 6px 20px rgba(30, 60, 120, 0.12);
  pointer-events: none;
  font-size: 0.95rem;
}

.side-nav a:hover .label,
.side-nav li.active .label {
  opacity: 1;
  transform: translateX(0);
}

.side-nav a:hover .dot {
  border-color: #2d6cea;
  color: #2d6cea;
}

.side-nav li.active .dot {
  background: linear-gradient(135deg, #2d6cea, #1d63d6);
  border-color: #1d63d6;
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(45, 108, 234, 0.4);
}

.side-nav li.active a {
  color: var(--hub-heading);
}

:root.dark .dot,
.dark .dot {
  background: rgba(20, 36, 64, 0.95);
  border-color: rgba(120, 160, 220, 0.35);
  color: #9ab8d8;
}

:root.dark .label,
.dark .label {
  background: rgba(20, 36, 64, 0.95);
  color: #e5eefc;
}

:root.dark .side-nav li.active .dot,
.dark .side-nav li.active .dot {
  background: linear-gradient(135deg, #5a9eff, #2d6cea);
  border-color: #5a9eff;
  color: #ffffff;
}

@media (max-width: 768px) {
  .side-nav {
    left: 50%;
    top: auto;
    bottom: 20px;
    transform: translateX(-50%) translateZ(0);
    -webkit-transform: translateX(-50%) translateZ(0);
    z-index: 999;
  }

  .side-nav ul {
    flex-direction: row;
    gap: 12px;
    padding: 8px 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(180, 210, 255, 0.5);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
  }

  .side-nav ul::before {
    display: none;
  }

  .dot {
    width: 40px;
    height: 40px;
    box-shadow: none;
  }

  .dot ion-icon {
    font-size: 1.25rem;
  }

  .label {
    display: none;
  }

  :root.dark .side-nav ul,
  .dark .side-nav ul {
    background: rgba(15, 23, 42, 0.92);
    border-color: rgba(90, 140, 220, 0.35);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }
}
</style>