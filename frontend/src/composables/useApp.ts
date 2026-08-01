import { ref } from 'vue';

export type Locale = 'uz' | 'ru' | 'en';

// Module-level singletons — shared across all component instances
const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'uz');
const isDark = ref(localStorage.getItem('theme') === 'dark');

export function useApp() {
  function toggleDark() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  }

  function setLocale(l: Locale) {
    locale.value = l;
    localStorage.setItem('locale', l);
  }

  return { locale, isDark, toggleDark, setLocale };
}
