<template>
  <header class="app-header" :class="{ 'app-header--dark': isDark }">
    <div class="header-inner">
      <a href="/" class="header-brand">
        <div class="header-logo-wrap">
          <img src="/logo-namdtu.jpeg" alt="NamDTU" />
        </div>
        <div class="header-brand-text">
          <strong>Namangan davlat texnika universiteti</strong>
          <div class="brand-rule"></div>
          <span>Raqamli xizmatlar platformasi</span>
        </div>
      </a>

      <div class="header-controls">
        <div class="locale-switcher">
          <button
            v-for="lang in (['uz', 'ru', 'en'] as const)"
            :key="lang"
            class="locale-btn"
            :class="{ active: locale === lang }"
            @click="setLocale(lang)"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>

        <button
          class="theme-toggle"
          :title="isDark ? 'Kunduzgi rejim' : 'Tungi rejim'"
          :aria-label="isDark ? 'Kunduzgi rejim' : 'Tungi rejim'"
          @click="toggleDark"
        >
          <ion-icon :icon="isDark ? sunnyOutline : moonOutline" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useApp } from '../../../composables/useApp';

const { locale, isDark, toggleDark, setLocale } = useApp();
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 10px 16px;
  margin-bottom: 14px;
  border-radius: 20px;
  background: var(--hub-header-bg, rgba(255, 255, 255, 0.82));
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  border: 1px solid var(--hub-border);
  box-shadow: 0 2px 20px rgba(44, 79, 136, 0.07);
  transition: background 300ms, border-color 300ms, box-shadow 300ms;
}

:root.dark .app-header {
  background: rgba(12, 24, 48, 0.72);
}

.app-header--dark {
  background: rgba(12, 20, 42, 0.88);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.28);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.header-logo-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  padding: 2px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
}

.header-logo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.header-brand-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  max-width: 280px;
}

.header-brand-text strong {
  color: var(--hub-text-primary);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.3;
  transition: color 300ms;
}

.brand-rule {
  height: 1px;
  background: currentColor;
  opacity: 0.18;
  border-radius: 1px;
  margin: 3px 0 2px;
}

.header-brand-text span {
  color: var(--hub-text-subtle);
  font-size: 0.72rem;
  font-weight: 600;
  transition: color 300ms;
}

@media (max-width: 480px) {
  .header-brand-text {
    max-width: 180px;
  }

  .header-brand-text strong {
    font-size: 0.7rem;
  }
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.locale-switcher {
  display: flex;
  gap: 3px;
  padding: 4px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.055);
  transition: background 300ms;
}

.app-header--dark .locale-switcher {
  background: rgba(255, 255, 255, 0.06);
}

.locale-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--hub-text-subtle);
  font-size: 0.76rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 150ms, color 150ms, box-shadow 150ms;
}

.locale-btn.active {
  background: #fff;
  color: #1a56d6;
  box-shadow: 0 2px 10px rgba(44, 79, 136, 0.16);
}

.app-header--dark .locale-btn.active {
  background: rgba(38, 68, 130, 0.85);
  color: #a8d0ff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.theme-toggle {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--hub-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.65);
  color: #2560e6;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 150ms, color 150ms, border-color 150ms, transform 150ms;
}

.app-header--dark .theme-toggle {
  background: rgba(30, 50, 100, 0.6);
  color: #f0c060;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

@media (max-width: 480px) {
  .header-brand-text span {
    display: none;
  }

  .locale-btn {
    padding: 6px 8px;
  }
}
</style>
