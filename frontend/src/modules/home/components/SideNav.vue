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
  { id: 'services', icon: chatbubblesOutline, label: t.value.navServices },
  { id: 'platforms', icon: gridOutline, label: t.value.navPlatforms },
]);

const activeId = ref<string>('hero');

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const sections = ['hero', 'services', 'platforms']
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activeId.value = visible.target.id;
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  sections.forEach((s) => observer!.observe(s));
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
.side-nav {
  position: fixed;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
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
  transition: color 200ms;
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
  transition: all 220ms;
  box-shadow: 0 3px 14px rgba(30, 60, 120, 0.1);
  flex-shrink: 0;
}

.dot ion-icon {
  font-size: 1.45rem;
}

.label {
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 200ms, transform 200ms;
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
  transform: scale(1.08);
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

:root.dark .dot {
  background: rgba(20, 36, 64, 0.9);
  border-color: rgba(120, 160, 220, 0.35);
  color: #9ab8d8;
}

:root.dark .label {
  background: rgba(20, 36, 64, 0.95);
  color: #e5eefc;
}

:root.dark .side-nav li.active .dot {
  background: linear-gradient(135deg, #5a9eff, #2d6cea);
  border-color: #5a9eff;
  color: #ffffff;
}

@media (max-width: 720px) {
  .side-nav {
    left: 50%;
    top: auto;
    bottom: 18px;
    transform: translateX(-50%);
  }

  .side-nav ul {
    flex-direction: row;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(235, 243, 255, 0.78) 100%
    );
    backdrop-filter: blur(18px) saturate(1.4);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    border: 1px solid rgba(180, 210, 255, 0.5);
    box-shadow: 0 12px 40px rgba(30, 60, 120, 0.22);
  }

  .side-nav ul::before {
    display: none;
  }

  .dot {
    width: 42px;
    height: 42px;
    box-shadow: none;
  }

  .dot ion-icon {
    font-size: 1.25rem;
  }

  .label {
    display: none;
  }

  :root.dark .side-nav ul {
    background: linear-gradient(
      135deg,
      rgba(20, 36, 64, 0.88) 0%,
      rgba(14, 26, 50, 0.82) 100%
    );
    border-color: rgba(90, 140, 220, 0.35);
  }
}
</style>