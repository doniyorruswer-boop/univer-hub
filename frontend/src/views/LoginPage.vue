<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 dark:bg-[#070c14] text-slate-900 dark:text-gray-100 font-sans transition-colors duration-200">
        
        <!-- Left Side: Brand Showcase & Ecosystem Info (Visible on Desktop) -->
        <div class="hidden md:flex flex-col justify-between md:w-1/2 lg:w-5/12 p-10 lg:p-14 bg-gradient-to-br from-[#0A1052] via-blue-950 to-slate-950 text-white relative overflow-hidden border-r border-slate-800">
          
          <!-- Subtle Grid Pattern Background -->
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <!-- Top Brand Logo -->
          <div class="relative z-10 flex items-center justify-between">
            <router-link to="/home" class="flex items-center gap-3 group">
              <img 
                src="/logo-namdtu.jpeg" 
                alt="NamDTU Logo" 
                class="w-11 h-11 object-cover object-left rounded-xl border border-white/20 shadow-md group-hover:scale-105 transition-transform" 
              />
              <div>
                <div class="font-bold text-base tracking-tight leading-tight">NamDTU Tizimlari</div>
                <div class="text-[11px] text-blue-300 font-medium">{{ t.panelChip }}</div>
              </div>
            </router-link>
          </div>

          <!-- Central Hero Text & Stats -->
          <div class="relative z-10 my-auto py-12">
            <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {{ t.loginHeroHeading }}
            </h2>
            <p class="text-slate-300 text-sm leading-relaxed max-w-md mb-8">
              {{ t.loginHeroText }}
            </p>

            <!-- Feature Bullet List -->
            <div class="space-y-3.5 text-xs text-slate-200">
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                  <span class="material-symbols-outlined text-sm">shield_lock</span>
                </span>
                <span>{{ t.loginFeature1 }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                  <span class="material-symbols-outlined text-sm">sync</span>
                </span>
                <span>{{ t.loginFeature2 }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                  <span class="material-symbols-outlined text-sm">person_outline</span>
                </span>
                <span>{{ t.loginFeature3 }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Footer -->
          <div class="relative z-10 text-xs text-slate-400 border-t border-white/10 pt-4 flex justify-between items-center">
            <span>&copy; {{ new Date().getFullYear() }} {{ t.itCenterFooter }}</span>
            <a href="https://namdtu.uz" target="_blank" class="hover:text-white transition-colors">namdtu.uz</a>
          </div>
        </div>

        <!-- Right Side: Clean Professional Login Form -->
        <div class="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
          
          <!-- Top Back Link & Language Switcher -->
          <div class="flex justify-between items-center mb-8">
            <router-link 
              to="/home" 
              class="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0A1052] dark:hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>{{ t.navHome }}</span>
            </router-link>

            <!-- Language Switcher -->
            <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <button 
                v-for="lang in (['uz', 'ru', 'en'] as const)" 
                :key="lang"
                @click="setLocale(lang)"
                class="px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer"
                :class="locale === lang ? 'bg-white dark:bg-slate-700 text-[#0A1052] dark:text-blue-400 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                {{ lang }}
              </button>
            </div>
          </div>

          <!-- Main Form Card Container -->
          <div class="my-auto">
            
            <div class="mb-6">
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                {{ t.loginTitle }}
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ t.loginSubtitle }}
              </p>
            </div>

            <!-- Role Selector Underline Tabs -->
            <div class="flex border-b border-slate-200 dark:border-slate-800 mb-6">
              <button
                type="button"
                @click="role = 'student'"
                class="pb-3 px-1 font-semibold text-xs transition-colors cursor-pointer mr-6 relative"
                :class="role === 'student' ? 'text-[#0A1052] dark:text-blue-400 border-b-2 border-[#0A1052] dark:border-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                {{ t.studentTab }}
              </button>
              <button
                type="button"
                @click="role = 'teacher'"
                class="pb-3 px-1 font-semibold text-xs transition-colors cursor-pointer relative"
                :class="role === 'teacher' ? 'text-[#0A1052] dark:text-blue-400 border-b-2 border-[#0A1052] dark:border-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                {{ t.teacherTab }}
              </button>
            </div>

            <!-- Error Banner -->
            <div v-if="authError" class="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
              <span class="material-symbols-outlined text-lg shrink-0">error</span>
              <span>{{ authError }}</span>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-4">
              
              <!-- Login Input -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ role === 'student' ? t.studentIdLabel : t.staffLoginLabel }}
                </label>
                <input 
                  v-model="loginInput"
                  type="text" 
                  required
                  maxlength="50"
                  autocomplete="username"
                  :placeholder="role === 'student' ? t.studentIdPlaceholder : t.staffLoginPlaceholder" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0A1052] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#0A1052] dark:focus:ring-blue-500 transition-colors font-mono"
                />
              </div>

              <!-- Password Input -->
              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {{ t.passwordLabel }}
                  </label>
                  <a href="https://student.namdtu.uz/dashboard/login" target="_blank" class="text-[11px] text-[#0A1052] dark:text-blue-400 font-semibold hover:underline">
                    {{ t.forgotPassword }}
                  </a>
                </div>
                <div class="relative">
                  <input 
                    v-model="passwordInput"
                    :type="showPassword ? 'text' : 'password'" 
                    required
                    maxlength="100"
                    autocomplete="current-password"
                    placeholder="••••••••" 
                    class="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0A1052] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#0A1052] dark:focus:ring-blue-500 transition-colors"
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <!-- Primary Login Button -->
              <button 
                type="submit" 
                :disabled="isLoading"
                class="w-full py-3.5 px-4 rounded-xl bg-[#0A1052] hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer mt-4"
              >
                <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <template v-else>
                  <span class="material-symbols-outlined text-lg">login</span>
                  <span>{{ t.loginBtnText }}</span>
                </template>
              </button>

            </form>

            <!-- Divider -->
            <div class="relative my-5 flex items-center justify-center">
              <div class="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span class="bg-slate-50 dark:bg-[#070c14] px-3 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase shrink-0">yoki</span>
            </div>

            <!-- HEMIS OAuth Button -->
            <button
              type="button"
              @click="handleOAuthRedirect"
              class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span class="material-symbols-outlined text-xl">fingerprint</span>
              <span>{{ t.oneIdLogin || 'HEMIS orqali kirish' }}</span>
            </button>
          </div>

          <!-- Bottom Footer Info -->
          <div class="mt-8 text-center md:text-left text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800 pt-4">
            {{ t.heroTitle }}
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useLocale } from '../composables/useLocale';
import { useApp } from '../composables/useApp';

const router = useRouter();
const { loginWithHemis, redirectToHemisOAuth, isLoading, authError } = useAuth();
const { t } = useLocale();
const { locale, setLocale } = useApp();

const role = ref<'student' | 'teacher'>('student');
const loginInput = ref<string>('');
const passwordInput = ref<string>('');
const showPassword = ref<boolean>(false);

async function handleLogin() {
  const success = await loginWithHemis(loginInput.value, passwordInput.value, role.value);
  if (success) {
    router.push('/home');
  }
}

function handleOAuthRedirect() {
  redirectToHemisOAuth(role.value);
}
</script>

<style scoped>
ion-content {
  --background: #f8fafc;
}

:root.dark ion-content,
.dark ion-content {
  --background: #070c14;
}
</style>
