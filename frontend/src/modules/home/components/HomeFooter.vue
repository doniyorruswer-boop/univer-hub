<template>
  <footer class="bg-[#0b1221] text-[#9ca3af] mt-xl rounded-t-3xl pt-2xl pb-lg px-gutter w-full">
    <div class="max-w-container-max mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl pb-xl border-b border-gray-800">
        <!-- Brand / Logo Section -->
        <div class="lg:col-span-4 flex flex-col gap-md">
          <div class="flex items-center gap-sm">
            <img 
              alt="NamDTU Logo" 
              class="w-12 h-12 object-cover object-left rounded-full border border-gray-700" 
              src="/logo-namdtu.jpeg"
            />
            <span class="text-white font-bold text-body-lg">
              {{ t.heroTitle }}
            </span>
          </div>
          <p class="italic text-sm text-gray-400">
            {{ t.brandMotto }}
          </p>
          <div class="flex gap-sm mt-sm">
            <a 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" 
              href="https://t.me/namdtu_rasmiy" 
              target="_blank"
              title="Telegram"
            >
              <span class="material-symbols-outlined text-white text-[20px]">send</span>
            </a>
            <a 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" 
              href="https://instagram.com/namdtu_rasmiy" 
              target="_blank"
              title="Instagram"
            >
              <span class="material-symbols-outlined text-white text-[20px]">photo_camera</span>
            </a>
            <a 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" 
              href="https://facebook.com/namdtu" 
              target="_blank"
              title="Facebook"
            >
              <span class="material-symbols-outlined text-white text-[20px]">facebook</span>
            </a>
            <a 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" 
              href="https://youtube.com/@namdtu" 
              target="_blank"
              title="YouTube"
            >
              <span class="material-symbols-outlined text-white text-[20px]">play_arrow</span>
            </a>
          </div>
        </div>

        <!-- Link Columns -->
        <div class="lg:col-span-2">
          <h4 class="text-[#DD8D1D] font-bold text-label-sm mb-md flex items-center border-l-2 border-[#DD8D1D] pl-2 uppercase tracking-wide">
            {{ t.contactTitle }}
          </h4>
          <ul class="space-y-md text-sm text-gray-400">
            <li class="flex items-start gap-sm">
              <span class="material-symbols-outlined text-[18px] mt-0.5">location_on</span>
              <span>{{ t.contactAddress }}</span>
            </li>
            <li class="flex items-center gap-sm">
              <span class="material-symbols-outlined text-[18px]">call</span>
              <span>(69)-234-14-30</span>
            </li>
            <li class="flex items-center gap-sm">
              <span class="material-symbols-outlined text-[18px]">mail</span>
              <span>namdtu_info@edu.uz</span>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-[#DD8D1D] font-bold text-label-sm mb-md flex items-center border-l-2 border-[#DD8D1D] pl-2 uppercase tracking-wide">
            {{ t.uniTitle }}
          </h4>
          <ul class="space-y-md text-sm text-gray-400">
            <li>
              <a class="hover:text-white transition-colors" :href="websiteUrl" target="_blank">
                {{ t.uniAbout }}
              </a>
            </li>
            <li>
              <a class="hover:text-white transition-colors" :href="websiteUrl" target="_blank">
                {{ t.uniStructure }}
              </a>
            </li>
            <li>
              <a class="hover:text-white transition-colors" :href="websiteUrl" target="_blank">
                {{ t.uniManagement }}
              </a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-[#DD8D1D] font-bold text-label-sm mb-md flex items-center border-l-2 border-[#DD8D1D] pl-2 uppercase tracking-wide">
            {{ t.servicesColTitle }}
          </h4>
          <ul class="space-y-md text-sm text-gray-400">
            <li>
              <a class="hover:text-white transition-colors" href="https://student-elms.namdtu.uz/" target="_blank">
                {{ t.lmsTitle }}
              </a>
            </li>
            <li>
              <a class="hover:text-white transition-colors" href="https://library.namdtu.uz/" target="_blank">
                {{ t.armTitle }}
              </a>
            </li>
            <li>
              <a class="hover:text-white transition-colors" href="https://regoffice.namdtu.uz/" target="_blank">
                {{ t.interactiveTitle }}
              </a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-[#DD8D1D] font-bold text-label-sm mb-md flex items-center border-l-2 border-[#DD8D1D] pl-2 uppercase tracking-wide">
            {{ t.docsTitle }}
          </h4>
          <ul class="space-y-md text-sm text-gray-400">
            <li>
              <a class="hover:text-white transition-colors" href="#">
                {{ t.privacyTitle }}
              </a>
            </li>
            <li>
              <a class="hover:text-white transition-colors" href="#">
                {{ t.termsTitle }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center text-xs text-gray-500 pb-sm">
        {{ t.copyright }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useLocale } from '../../../composables/useLocale';

defineProps<{
  websiteUrl: string;
}>();

const { t } = useLocale();
</script>