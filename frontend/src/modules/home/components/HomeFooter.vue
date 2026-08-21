<template>
  <footer class="bg-[#0b1221] text-[#9ca3af] mt-xl rounded-t-3xl pt-2xl pb-lg px-gutter w-full">
    <div class="max-w-container-max mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl pb-xl border-b border-gray-800">
        <!-- Brand / Logo Section -->
        <div class="lg:col-span-4 flex flex-col gap-md">
          <div class="flex items-center gap-3.5">
            <img 
              alt="NamDTU Logo" 
              class="w-12 h-12 shrink-0 object-cover object-left rounded-xl border border-slate-700/80 shadow-md" 
              src="/logo-namdtu.jpeg"
            />
            <h3 class="text-white font-extrabold text-base sm:text-lg lg:text-xl leading-snug tracking-tight">
              <template v-if="locale === 'uz'">
                Namangan davlat <br />
                texnika universiteti
              </template>
              <template v-else-if="locale === 'ru'">
                Наманганский государственный <br />
                технический университет
              </template>
              <template v-else>
                Namangan State <br />
                Technical University
              </template>
            </h3>
          </div>
          <p class="italic text-sm text-gray-400">
            {{ t.brandMotto }}
          </p>
          <div class="flex gap-2.5 mt-2">
            <a 
              class="w-10 h-10 bg-slate-800/90 text-slate-300 hover:text-white rounded-xl flex items-center justify-center hover:bg-[#229ED9] transition-all duration-200 shadow-sm border border-slate-700/60 hover:border-transparent group" 
              href="https://t.me/namdtu_rasmiy" 
              target="_blank"
              title="Telegram"
            >
              <svg class="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.75 4.03-1.75 6.72-2.9 8.07-3.46 3.84-1.6 4.64-1.88 5.16-1.89.11 0 .37.03.54.17.14.12.18.28.2.4.02.07.02.21 0 .34z"/>
              </svg>
            </a>
            <a 
              class="w-10 h-10 bg-slate-800/90 text-slate-300 hover:text-white rounded-xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all duration-200 shadow-sm border border-slate-700/60 hover:border-transparent group" 
              href="https://instagram.com/namdtu_rasmiy" 
              target="_blank"
              title="Instagram"
            >
              <svg class="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              class="w-10 h-10 bg-slate-800/90 text-slate-300 hover:text-white rounded-xl flex items-center justify-center hover:bg-[#1877F2] transition-all duration-200 shadow-sm border border-slate-700/60 hover:border-transparent group" 
              href="https://facebook.com/namdtu" 
              target="_blank"
              title="Facebook"
            >
              <svg class="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              class="w-10 h-10 bg-slate-800/90 text-slate-300 hover:text-white rounded-xl flex items-center justify-center hover:bg-[#FF0000] transition-all duration-200 shadow-sm border border-slate-700/60 hover:border-transparent group" 
              href="https://youtube.com/@namdtu" 
              target="_blank"
              title="YouTube"
            >
              <svg class="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
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
import { useApp } from '../../../composables/useApp';

defineProps<{
  websiteUrl: string;
}>();

const { t } = useLocale();
const { locale } = useApp();
</script>