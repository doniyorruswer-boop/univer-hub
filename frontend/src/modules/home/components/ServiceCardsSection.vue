<template>
  <section id="platforms" class="mb-xl scroll-mt-24 pt-2">
    <div class="mb-2xl">
      <h3 class="font-headline-sm text-headline-md text-primary dark:text-white mb-md pb-xs border-b border-outline-variant dark:border-gray-800 font-semibold">
        {{ t.platformsTitle }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <a 
          v-for="platform in platformsWithLocale" 
          :key="platform.id"
          :href="platform.url"
          @click.prevent="launchPlatform(platform.url, platform.id)"
          class="bg-surface-container-lowest dark:bg-[#0b1221] border border-outline-variant dark:border-gray-800 rounded-xl p-lg flex flex-col h-full transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary-fixed-dim hover:shadow-md group cursor-pointer border-b-4 border-b-[#0A1052] dark:border-b-[#5a9eff] relative overflow-hidden"
        >
          <div class="relative z-10 flex flex-col h-full">
            <span class="text-xs font-bold text-[#DD8D1D] uppercase tracking-widest mb-xs">
              {{ platform.tag }}
            </span>
            
            <h3 class="font-headline-sm text-headline-sm text-primary dark:text-white mb-sm group-hover:text-[#0A1052] dark:group-hover:text-[#5a9eff] transition-colors font-semibold">
              {{ platform.title }}
            </h3>
            
            <p class="font-body-md text-body-md text-secondary dark:text-gray-400 flex-grow mb-lg pr-8">
              {{ platform.description }}
            </p>
            
            <div class="pt-md border-t border-outline-variant dark:border-gray-800 flex justify-between items-center mt-auto">
              <span class="text-[#0A1052] dark:text-[#5a9eff] font-bold text-label-md">
                {{ t.startBtn }}
              </span>
              <div class="w-8 h-8 bg-surface-container-high dark:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 group-hover:bg-[#0A1052] dark:group-hover:bg-[#5a9eff]">
                <span class="material-symbols-outlined text-sm text-[#0A1052] dark:text-white group-hover:text-white dark:group-hover:text-slate-950 transition-colors">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
          
          <div class="absolute right-2 top-2 opacity-10 -z-0 pointer-events-none text-[#DD8D1D]">
            <span class="material-symbols-outlined text-[100px]">
              {{ platform.icon }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../../composables/useAuth';
import { useLocale } from '../../../composables/useLocale';
import { webPlatformMeta } from '../data';

const router = useRouter();
const { t } = useLocale();
const { isLoggedIn, getSsoRedirectUrl } = useAuth();

function launchPlatform(baseUrl: string, platformId: string) {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  const ssoUrl = getSsoRedirectUrl(baseUrl, platformId);
  window.open(ssoUrl, '_blank');
}

const platformsWithLocale = computed(() => {
  return webPlatformMeta.map((meta, idx) => {
    const loc = t.value.platforms[idx] || {};
    return {
      id: meta.id,
      url: meta.url,
      icon: meta.icon,
      title: loc.title || '',
      description: loc.description || '',
      tag: loc.tag || '',
    };
  });
});
</script>