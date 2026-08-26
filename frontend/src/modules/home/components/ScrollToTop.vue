<template>
  <button
    type="button"
    @click="scrollToTop"
    :class="[
      showButton
        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto shadow-2xl'
        : 'opacity-0 translate-y-6 scale-90 pointer-events-none',
      'fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[999] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0A1052] via-blue-900 to-indigo-600 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 text-white border border-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-blue-900/40 dark:shadow-indigo-500/30'
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
let timerId: any = null;

function checkScroll(e?: any) {
  let currentScroll = 0;

  if (e && e.detail && typeof e.detail.scrollTop === 'number') {
    currentScroll = e.detail.scrollTop;
  }

  const ionContents = document.querySelectorAll('ion-content');
  ionContents.forEach(content => {
    if ((content as any).shadowRoot) {
      const inner = (content as any).shadowRoot.querySelector('.inner-scroll');
      if (inner && inner.scrollTop > currentScroll) {
        currentScroll = inner.scrollTop;
      }
    }
  });

  const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (winScroll > currentScroll) {
    currentScroll = winScroll;
  }

  showButton.value = currentScroll > 150;
}

function scrollToTop() {
  const ionContents = document.querySelectorAll('ion-content');
  ionContents.forEach(content => {
    if ((content as any).scrollToTop) {
      (content as any).scrollToTop(300);
    }
    if ((content as any).getScrollElement) {
      (content as any).getScrollElement().then((el: HTMLElement) => {
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    if ((content as any).shadowRoot) {
      const inner = (content as any).shadowRoot.querySelector('.inner-scroll');
      if (inner) {
        inner.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.scrollTo({ top: 0, behavior: 'smooth' });
}

async function attachScrollListeners() {
  window.addEventListener('scroll', checkScroll, { passive: true });
  document.addEventListener('scroll', checkScroll, { passive: true });

  const ionContents = document.querySelectorAll('ion-content');
  ionContents.forEach(async (content) => {
    content.addEventListener('ionScroll', checkScroll as any);
    content.addEventListener('scroll', checkScroll, { passive: true });

    if ((content as any).getScrollElement) {
      const el = await (content as any).getScrollElement().catch(() => null);
      if (el) {
        el.addEventListener('scroll', checkScroll, { passive: true });
      }
    }
  });
}

onMounted(() => {
  attachScrollListeners();
  timerId = setInterval(checkScroll, 300);
});

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
  window.removeEventListener('scroll', checkScroll);
  document.removeEventListener('scroll', checkScroll);
});
</script>
