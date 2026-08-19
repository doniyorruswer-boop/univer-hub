<template>
  <button
    type="button"
    @click="scrollToTop"
    :class="[
      showButton
        ? 'opacity-100 translate-y-0 pointer-events-auto shadow-xl'
        : 'opacity-0 translate-y-6 pointer-events-none',
      'fixed bottom-6 right-4 sm:bottom-10 sm:right-8 z-[99] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0A1052] to-blue-700 dark:from-blue-600 dark:to-indigo-600 text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95'
    ]"
    aria-label="Yuqoriga qaytish"
    title="Yuqoriga qaytish"
  >
    <span class="material-symbols-outlined text-2xl sm:text-3xl font-bold">
      keyboard_arrow_up
    </span>
  </button>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const showButton = ref(false);
let ionContentEl: Element | null = null;
let scrollInnerEl: Element | null = null;

function scrollToTop() {
  const content = document.querySelector('ion-content');
  if (content && (content as any).scrollToTop) {
    (content as any).scrollToTop(400);
  }

  const hero = document.getElementById('hero');
  if (hero) {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function checkScroll() {
  const hero = document.getElementById('hero');
  if (hero) {
    const rect = hero.getBoundingClientRect();
    showButton.value = rect.bottom < 120 || rect.top < -150;
  } else {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    showButton.value = scrollTop > 150;
  }
}

onMounted(async () => {
  window.addEventListener('scroll', checkScroll, { passive: true });
  document.addEventListener('scroll', checkScroll, { passive: true });

  ionContentEl = document.querySelector('ion-content');
  if (ionContentEl) {
    ionContentEl.addEventListener('ionScroll', checkScroll as any);
    ionContentEl.addEventListener('scroll', checkScroll, { passive: true });

    if ((ionContentEl as any).getScrollElement) {
      scrollInnerEl = await (ionContentEl as any).getScrollElement();
      if (scrollInnerEl) {
        scrollInnerEl.addEventListener('scroll', checkScroll, { passive: true });
      }
    }
  }

  setTimeout(checkScroll, 200);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll);
  document.removeEventListener('scroll', checkScroll);
  if (ionContentEl) {
    ionContentEl.removeEventListener('ionScroll', checkScroll as any);
    ionContentEl.removeEventListener('scroll', checkScroll);
  }
  if (scrollInnerEl) {
    scrollInnerEl.removeEventListener('scroll', checkScroll);
  }
});
</script>
