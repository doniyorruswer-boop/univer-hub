import { computed } from 'vue';
import { messages } from '../modules/home/i18n/index';
import { useApp } from './useApp';

export function useLocale() {
  const { locale } = useApp();
  const t = computed(() => messages[locale.value]);
  return { t };
}
