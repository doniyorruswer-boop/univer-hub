<template>
  <header class="bg-surface-container-lowest dark:bg-[#0b1221] border-b border-outline-variant dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
    <div class="flex justify-between items-center px-lg py-sm w-full max-w-container-max mx-auto h-16">
      <div class="flex items-center space-x-md">
        <a href="#hero" @click.prevent="scrollTo('hero')" class="flex items-center gap-sm cursor-pointer">
          <span class="font-headline-md text-headline-md text-[#0A1052] dark:text-white font-semibold">
            NamDTU Tizimlari
          </span>
        </a>
      </div>
      
      <nav class="hidden md:flex space-x-lg items-center">
        <a 
          v-for="link in navLinks" 
          :key="link.id"
          :href="`#${link.id}`"
          @click.prevent="scrollTo(link.id)"
          :class="[
            activeSection === link.id
              ? 'text-[#0A1052] dark:text-[#5a9eff] font-bold border-b-2 border-solid border-[#0A1052] dark:border-[#5a9eff]'
              : 'text-secondary dark:text-gray-400 font-medium hover:text-[#0A1052] dark:hover:text-white border-b-2 border-solid border-transparent',
            'font-body-md pb-1 transition-all duration-150 cursor-pointer inline-block'
          ]"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center space-x-sm">
        <div class="flex items-center gap-xs mr-sm">
          <button 
            @click="setLocale('uz')" 
            :class="locale === 'uz' ? 'text-[#0A1052] dark:text-[#5a9eff] font-bold underline' : 'text-secondary dark:text-gray-400 font-medium hover:text-[#0A1052] dark:hover:text-white'" 
            class="text-label-sm transition-colors px-xs"
          >
            UZ
          </button>
          <span class="text-outline-variant dark:text-gray-600 text-label-sm">|</span>
          <button 
            @click="setLocale('ru')" 
            :class="locale === 'ru' ? 'text-[#0A1052] dark:text-[#5a9eff] font-bold underline' : 'text-secondary dark:text-gray-400 font-medium hover:text-[#0A1052] dark:hover:text-white'" 
            class="text-label-sm transition-colors px-xs"
          >
            RU
          </button>
          <span class="text-outline-variant dark:text-gray-600 text-label-sm">|</span>
          <button 
            @click="setLocale('en')" 
            :class="locale === 'en' ? 'text-[#0A1052] dark:text-[#5a9eff] font-bold underline' : 'text-secondary dark:text-gray-400 font-medium hover:text-[#0A1052] dark:hover:text-white'" 
            class="text-label-sm transition-colors px-xs"
          >
            EN
          </button>
        </div>

        <!-- Light/Dark Mode Switcher -->
        <button 
          @click="toggleDark" 
          class="p-sm text-secondary dark:text-gray-300 hover:bg-surface-container dark:hover:bg-gray-800 rounded-full transition-colors duration-150 flex items-center justify-center"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
        </button>

        <!-- SSO Logged In User Badge or Login Button -->
        <div v-if="isLoggedIn" class="relative" ref="profileMenuRef">
          <button 
            @click="isProfileMenuOpen = !isProfileMenuOpen"
            class="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <img 
              :src="user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'" 
              alt="User Avatar"
              class="w-7 h-7 rounded-full object-cover border border-blue-500"
            />
            <div class="text-left hidden sm:block">
              <div class="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {{ user?.fullName.split(' ')[0] }}
              </div>
              <div class="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                {{ user?.studentId || 'HEMIS ID' }}
              </div>
            </div>
            <span 
              class="material-symbols-outlined text-sm text-slate-500 transition-transform duration-200"
              :class="isProfileMenuOpen ? 'rotate-180' : ''"
            >
              expand_more
            </span>
          </button>

          <!-- User Dropdown Menu -->
          <Transition name="dropdown">
            <div 
              v-if="isProfileMenuOpen"
              class="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 transform origin-top-right transition-all duration-200"
            >
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-1 border border-slate-100 dark:border-slate-800">
                <div class="text-xs font-extrabold text-slate-900 dark:text-white">
                  {{ user?.fullName }}
                </div>
                <div class="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  {{ user?.faculty }} ({{ user?.group }})
                </div>
                <div class="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {{ t.activeSsoText }}
                </div>
              </div>

              <a 
                href="https://student.namdtu.uz/dashboard/login" 
                target="_blank" 
                @click="isProfileMenuOpen = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span class="material-symbols-outlined text-base text-blue-500">badge</span>
                {{ t.myProfileText }}
              </a>

              <button 
                @click="handleLogout"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors mt-1 cursor-pointer"
              >
                <span class="material-symbols-outlined text-base">logout</span>
                {{ t.logoutBtnText }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Login Router Link -->
        <router-link 
          v-else
          to="/login"
          class="inline-flex items-center justify-center gap-2 font-label-md px-4 py-2 rounded-xl transition-all hover:opacity-95 shadow-md bg-gradient-to-r from-[#0A1052] to-blue-700 dark:from-blue-600 dark:to-indigo-600 text-white font-bold text-xs cursor-pointer" 
        >
          <span class="material-symbols-outlined text-base">vpn_key</span>
          <span>{{ t.loginBtnText }}</span>
        </router-link>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useApp } from '../../../composables/useApp';
import { useAuth } from '../../../composables/useAuth';
import { useLocale } from '../../../composables/useLocale';

const { locale, setLocale, isDark, toggleDark } = useApp();
const { t } = useLocale();
const { user, isLoggedIn, logout } = useAuth();

const activeSection = ref<string>('hero');
const isProfileMenuOpen = ref<boolean>(false);
const profileMenuRef = ref<HTMLElement | null>(null);

function handleLogout() {
  logout();
  isProfileMenuOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target as Node)) {
    isProfileMenuOpen.value = false;
  }
}

const navLinks = computed(() => [
  { id: 'hero', label: t.value.navHome },
  { id: 'platforms', label: t.value.navPlatforms },
  { id: 'services', label: t.value.navServices },
]);

let isProgrammaticScroll = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
let ionContentEl: Element | null = null;

function scrollTo(id: string) {
  activeSection.value = id;
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
      activeSection.value = 'services';
      return;
    }
  }

  if (platformsEl) {
    const pRect = platformsEl.getBoundingClientRect();
    if (pRect.top <= navThreshold && pRect.bottom > 120) {
      activeSection.value = 'platforms';
      return;
    }
  }

  if (heroEl) {
    const hRect = heroEl.getBoundingClientRect();
    if (hRect.bottom > navThreshold) {
      activeSection.value = 'hero';
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

  document.addEventListener('click', handleClickOutside);
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
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
