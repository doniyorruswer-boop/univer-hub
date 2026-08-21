<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isLoginModalOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        @click.self="closeLoginModal"
      >
        <!-- Pure Corporate Minimalist Modal Card -->
        <div 
          class="relative w-full max-w-[400px] bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-200 p-6 sm:p-7"
        >
          <!-- Close Button -->
          <button 
            @click="closeLoginModal"
            class="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>

          <!-- Top Brand Header -->
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 mb-1.5">
              <img 
                src="/logo-namdtu.jpeg" 
                alt="NamDTU Logo" 
                class="w-7 h-7 object-cover object-left rounded-lg border border-slate-200 dark:border-slate-700" 
              />
              <span class="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                NamDTU Portal
              </span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Tizimga kirish
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              HEMIS ma'lumotlaringiz orqali portalga ulaning
            </p>
          </div>

          <!-- Minimalist Underline Tabs -->
          <div class="flex border-b border-slate-200 dark:border-slate-800 mb-5">
            <button
              type="button"
              @click="role = 'student'"
              class="pb-2.5 px-1 font-semibold text-xs transition-colors cursor-pointer mr-6 relative"
              :class="role === 'student' ? 'text-[#0A1052] dark:text-blue-400 border-b-2 border-[#0A1052] dark:border-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            >
              Talaba
            </button>
            <button
              type="button"
              @click="role = 'teacher'"
              class="pb-2.5 px-1 font-semibold text-xs transition-colors cursor-pointer relative"
              :class="role === 'teacher' ? 'text-[#0A1052] dark:text-blue-400 border-b-2 border-[#0A1052] dark:border-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            >
              Xodim / O'qituvchi
            </button>
          </div>

          <!-- Error Alert Banner -->
          <div v-if="authError" class="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <span class="material-symbols-outlined text-base shrink-0">error</span>
            <span>{{ authError }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            
            <!-- Login Field -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                HEMIS {{ role === 'student' ? 'ID (Talaba raqami)' : 'Login' }}
              </label>
              <input 
                v-model="loginInput"
                type="text" 
                required
                maxlength="50"
                autocomplete="username"
                :placeholder="role === 'student' ? '3822100014' : 'xodim_login'" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0A1052] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#0A1052] dark:focus:ring-blue-500 transition-colors font-mono"
              />
            </div>

            <!-- Password Field -->
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Parol
                </label>
                <a href="https://student.namdtu.uz/dashboard/login" target="_blank" class="text-[11px] text-[#0A1052] dark:text-blue-400 hover:underline">
                  Unutdingizmi?
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
                  class="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0A1052] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#0A1052] dark:focus:ring-blue-500 transition-colors"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>



            <!-- Solid Corporate Primary Button -->
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full py-2.5 px-4 rounded-lg bg-[#0A1052] hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Kirish</span>
            </button>

          </form>

          <!-- Footer note -->
          <div class="mt-5 text-center text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-3">
            Namangan Davlat Texnika Universiteti &copy; SSO
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../../composables/useAuth';

const { isLoginModalOpen, closeLoginModal, loginWithHemis, isLoading, authError } = useAuth();

const role = ref<'student' | 'teacher'>('student');
const loginInput = ref<string>('');
const passwordInput = ref<string>('');
const showPassword = ref<boolean>(false);

async function handleLogin() {
  const success = await loginWithHemis(loginInput.value, passwordInput.value, role.value);
  if (success) {
    loginInput.value = '';
    passwordInput.value = '';
  }
}


</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
