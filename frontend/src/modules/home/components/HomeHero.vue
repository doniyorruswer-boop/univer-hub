<template>
  <div 
    id="hero" 
    class="scroll-mt-20 relative overflow-hidden z-0 bg-gradient-to-b from-slate-50/90 via-blue-50/40 to-white dark:from-[#090e1a] dark:via-[#0c1428] dark:to-[#070c18] text-slate-900 dark:text-white transition-colors duration-300"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Soft Crisp Academic Neural Matrix Background Engine -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      <!-- Interactive Neural Matrix Canvas -->
      <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full block opacity-60 dark:opacity-90"></canvas>

      <!-- Soft Luminous Light Blobs -->
      <div class="absolute -top-36 -left-36 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/30 via-indigo-300/15 to-purple-300/10 dark:from-blue-600/35 dark:via-indigo-600/20 dark:to-purple-600/15 rounded-full blur-[65px] animate-blob-float will-change-transform"></div>
      <div class="absolute top-10 -right-36 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-300/30 via-blue-300/15 to-indigo-300/10 dark:from-cyan-500/30 dark:via-blue-600/20 dark:to-indigo-600/15 rounded-full blur-[65px] animate-blob-float-reverse will-change-transform"></div>
      <div class="absolute -bottom-28 left-1/3 w-[450px] h-[450px] bg-gradient-to-t from-sky-200/30 via-blue-200/15 to-transparent dark:from-indigo-600/25 dark:via-blue-600/15 rounded-full blur-[60px] animate-pulse-slow will-change-transform"></div>

      <!-- Crisp Tech Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#0a105215_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#38bdf830_1.5px,transparent_1.5px)] [bg-size:36px_36px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_10%,#000_85%,transparent_100%)]"></div>
    </div>

    <!-- Main Hero Content (On top of canvas layer) -->
    <section class="relative z-10">
      <div class="max-w-container-max mx-auto px-gutter pt-10 pb-14 md:pt-16 md:pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
        
        <!-- Left Side: Hero Content -->
        <div class="flex-1 space-y-6 z-10 w-full text-left">

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            {{ t.heroTagline.split('—')[0] || 'Barcha xizmatlar' }} <br class="hidden sm:inline" />
            <span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0A1052] via-blue-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-white pb-3">
              {{ t.heroTagline.split('—')[1] || 'bitta platformada' }}
              <!-- Creative Underline Accent SVG -->
              <svg class="absolute bottom-0 left-0 w-full h-3.5 text-[#DA8B1D] dark:text-amber-400 overflow-visible" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4C50 2 150 2 198 4" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M10 9.5C60 7.5 140 7.5 190 9.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
              </svg>
            </span>
          </h1>

          <!-- Feature Chips Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-y border-slate-200/80 dark:border-slate-800/80 my-6">
            <div 
              v-for="(point, idx) in t.heroPoints" 
              :key="idx" 
              class="group flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default"
            >
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 dark:from-blue-500/25 dark:to-indigo-500/25 text-[#0A1052] dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <span class="material-symbols-outlined text-xl">
                  {{ heroIcons[idx] || 'grid_view' }}
                </span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ point.title }}
                </span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block line-clamp-1">
                  {{ point.text }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#platforms" 
              class="relative group overflow-hidden bg-gradient-to-r from-[#0A1052] via-blue-900 to-indigo-900 dark:from-blue-600 dark:to-indigo-600 text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:shadow-2xl hover:shadow-blue-900/30 dark:hover:shadow-blue-500/35 transition-all duration-300 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
            >
              <span class="relative z-10">{{ t.startBtn }}</span>
              <span class="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">login</span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
            
            <a 
              :href="websiteUrl" 
              target="_blank" 
              class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{{ t.mainSiteBtn }}</span>
              <span class="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">open_in_new</span>
            </a>
          </div>

        </div>

        <!-- Right Side: Bento Grid Launchpad Showcase -->
        <div class="flex-1 w-full relative z-10">
          
          <!-- Outer Ambient Glow behind Bento -->
          <div class="absolute -inset-3 bg-gradient-to-tr from-blue-500/15 via-purple-500/15 to-indigo-500/15 rounded-3xl blur-2xl -z-10"></div>

          <!-- Bento Grid Container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Bento Item 1: Large Featured Card (HEMIS System) -->
            <div 
              @click="launchPlatform('https://student.namdtu.uz', 'hemis')"
              class="sm:col-span-2 p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40 hover:border-blue-400 dark:hover:border-blue-500/60 transition-all duration-300 group cursor-pointer"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    H
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">HEMIS Ta'lim Tizimi</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ t.hemisPortalDesc }}</p>
                  </div>
                </div>

                <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {{ t.officialPortalTag }}
                </span>
              </div>

              <!-- Live Integration Bar & Avatar Stack -->
              <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span class="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">sync_alt</span>
                  <span>{{ t.hemisFeaturesDesc }}</span>
                </div>

                <!-- Avatar Stack Indicator -->
                <div class="flex items-center -space-x-2">
                  <div class="w-7 h-7 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">A</div>
                  <div class="w-7 h-7 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">S</div>
                  <div class="w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">M</div>
                  <div class="w-7 h-7 rounded-full bg-slate-800 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">+15k</div>
                </div>
              </div>
            </div>

            <!-- Bento Item 2: Telegram Bot Integration Card -->
            <div 
              @click="launchPlatform('https://t.me/namdtu_bot', 'bot')"
              class="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-900/5 dark:shadow-black/40 hover:border-sky-400 dark:hover:border-sky-500/60 transition-all duration-300 group cursor-pointer"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-xs">
                  <span class="material-symbols-outlined text-lg">smart_toy</span>
                </div>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">{{ t.officialBotTag }}</span>
              </div>
              <h4 class="font-bold text-xs text-slate-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Telegram Bot</h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {{ t.botCardDesc }}
              </p>
            </div>

            <!-- Bento Item 3: ARM Kutubxona Card -->
            <div 
              @click="launchPlatform('https://arm.namdtu.uz', 'arm')"
              class="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-900/5 dark:shadow-black/40 hover:border-amber-400 dark:hover:border-amber-500/60 transition-all duration-300 group cursor-pointer"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-lg">menu_book</span>
                </div>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">{{ t.eLibraryTag }}</span>
              </div>
              <h4 class="font-bold text-xs text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">ARM Portali</h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {{ t.armCardDesc }}
              </p>
            </div>

            <!-- Bento Item 4: Quick Launch Matrix Pill Chips -->
            <div class="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-1">{{ t.quickAccess }}</span>
              <div class="flex flex-wrap items-center gap-2">
                <a href="#platforms" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors">
                  HEMIS ↗
                </a>
                <a href="#platforms" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors">
                  Bot ↗
                </a>
                <a href="#platforms" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors">
                  Kutubxona ↗
                </a>
                <a href="#platforms" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors">
                  LMS ↗
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- Restored & Enhanced Stats Section -->
    <div class="max-w-container-max mx-auto px-gutter pb-12">
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        
        <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl text-center hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-xl">grid_view</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white mb-0.5 tracking-tight bg-clip-text bg-gradient-to-r from-[#0A1052] to-blue-600 dark:from-white dark:to-blue-300">
            20+
          </div>
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {{ t.navPlatforms }}
          </div>
        </div>

        <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl text-center hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-xl">groups</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white mb-0.5 tracking-tight bg-clip-text bg-gradient-to-r from-[#0A1052] to-blue-600 dark:from-white dark:to-blue-300">
            15k+
          </div>
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {{ t.metrics[0]?.label || "Foydalanuvchilar" }}
          </div>
        </div>

        <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl text-center hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-xl">support_agent</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white mb-0.5 tracking-tight bg-clip-text bg-gradient-to-r from-[#0A1052] to-blue-600 dark:from-white dark:to-blue-300">
            24/7
          </div>
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {{ t.metrics[1]?.label || "Qo'llab-quvvatlash" }}
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../../composables/useAuth';
import { useLocale } from '../../../composables/useLocale';

defineProps<{
  websiteUrl: string;
}>();

const router = useRouter();
const { t } = useLocale();
const { isLoggedIn, getSsoRedirectUrl } = useAuth();

const particleCanvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number | null = null;

const mouseX = ref<number>(-1000);
const mouseY = ref<number>(-1000);

function handleMouseMove(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  mouseX.value = event.clientX - rect.left;
  mouseY.value = event.clientY - rect.top;
}

function handleMouseLeave() {
  mouseX.value = -1000;
  mouseY.value = -1000;
}

function launchPlatform(baseUrl: string, platformId: string) {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  const ssoUrl = getSsoRedirectUrl(baseUrl, platformId);
  window.open(ssoUrl, '_blank');
}

const heroIcons = ['grid_view', 'verified_user', 'bolt'];

// Variant 1: Enhanced AI Neural Network & Large Hub Node Engine
onMounted(() => {
  const canvas = particleCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

  const handleResize = () => {
    if (!canvas || !canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  };
  window.addEventListener('resize', handleResize);

  // 1. Neural Nodes
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 35 : 55;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1.0,
    vy: (Math.random() - 0.5) * 1.0,
    radius: Math.random() * 2.5 + 2,
    color: ['#38BDF8', '#818CF8', '#C084FC', '#34D399', '#F43F5E'][Math.floor(Math.random() * 5)]
  }));

  // 2. AI Constellation Hub Nodes
  const hubCount = isMobile ? 3 : 5;
  const hubs = Array.from({ length: hubCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 6 + 7,
    pulse: Math.random() * Math.PI,
    color: ['#38BDF8', '#818CF8', '#A855F7', '#34D399'][Math.floor(Math.random() * 4)]
  }));

  const drawParticles = () => {
    ctx.clearRect(0, 0, width, height);

    // Update & Draw Large AI Constellation Hubs
    hubs.forEach((h) => {
      h.x += h.vx;
      h.y += h.vy;
      h.pulse += 0.03;

      if (h.x < 0 || h.x > width) h.vx *= -1;
      if (h.y < 0 || h.y > height) h.vy *= -1;

      const currentRadius = h.radius + Math.sin(h.pulse) * 2;

      // Outer Glowing Ring Halo
      ctx.beginPath();
      ctx.arc(h.x, h.y, currentRadius * 1.6, 0, Math.PI * 2);
      ctx.strokeStyle = h.color;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner Core Orb
      ctx.beginPath();
      ctx.arc(h.x, h.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = h.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    // Update & Draw Standard Particles
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw Particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Connect nearby particles with web lines
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 22500) { // 150px * 150px
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 150) * 0.35;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Connect particle to mouse if close
      if (mouseX.value > 0 && mouseY.value > 0) {
        const mdx = p.x - mouseX.value;
        const mdy = p.y - mouseY.value;
        const mdistSq = mdx * mdx + mdy * mdy;

        if (mdistSq < 48400) { // 220px * 220px
          const mdist = Math.sqrt(mdistSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX.value, mouseY.value);
          const alpha = (1 - mdist / 220) * 0.7;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(drawParticles);
  };

  drawParticles();

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });
});
</script>

<style scoped>
@keyframes blobFloat {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -40px) scale(1.08);
  }
  66% {
    transform: translate(-25px, 20px) scale(0.95);
  }
}

@keyframes blobFloatReverse {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(-35px, 35px) scale(0.94);
  }
  66% {
    transform: translate(20px, -20px) scale(1.06);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.animate-blob-float {
  animation: blobFloat 14s ease-in-out infinite;
}

.animate-blob-float-reverse {
  animation: blobFloatReverse 16s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulseGlow 10s ease-in-out infinite;
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-spin-slow {
  animation: spinSlow 28s linear infinite;
}

.animate-spin-reverse {
  animation: spinReverse 22s linear infinite;
}
</style>