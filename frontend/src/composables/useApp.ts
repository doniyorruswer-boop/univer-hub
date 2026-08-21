import { ref } from 'vue';

export type Locale = 'uz' | 'ru' | 'en';

const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
// Default to dark mode (true) on first visit if no saved preference
const isDark = ref(savedTheme ? savedTheme === 'dark' : true);
const locale = ref<Locale>((typeof window !== 'undefined' ? localStorage.getItem('locale') as Locale : null) || 'uz');

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
