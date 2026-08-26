<template>
  <ion-page>
    <ion-content class="ion-padding-none" :scroll-events="true">
      <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070c18] text-slate-900 dark:text-white transition-colors duration-300">
        
        <!-- App Header Bar -->
        <AppHeader website-url="https://namdtu.uz/" />

        <!-- Profile Page Main Container -->
        <main class="w-full flex-grow max-w-container-max mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12">
          
          <!-- Top Demo Mode & Role Switcher Banner -->
          <div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3 text-center sm:text-left">
              <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span class="material-symbols-outlined text-xl">badge</span>
              </div>
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ pTrans.title }}</span>
                  <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Live Sync
                  </span>
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ pTrans.subtitle }}
                </p>
              </div>
            </div>

            <!-- Role Selector Toggle Pills -->
            <div class="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-inner">
              <button 
                @click="activeRole = 'student'" 
                :class="[
                  activeRole === 'student' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium',
                  'px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer'
                ]"
              >
                <span class="material-symbols-outlined text-base">school</span>
                <span>{{ pTrans.studentRole }}</span>
              </button>

              <button 
                @click="activeRole = 'teacher'" 
                :class="[
                  activeRole === 'teacher' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium',
                  'px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer'
                ]"
              >
                <span class="material-symbols-outlined text-base">psychology</span>
                <span>{{ pTrans.teacherRole }}</span>
              </button>
            </div>
          </div>

          <!-- Hero Profile Header Card -->
          <div class="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl mb-8">
            <!-- Decorative Banner Gradient Background -->
            <div class="h-36 sm:h-44 bg-gradient-to-r from-[#0A1052] via-blue-900 to-indigo-900 relative">
              <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [bg-size:24px_24px]"></div>
              <div class="absolute right-6 top-6 flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  HEMIS REST API v1.0
                </span>
              </div>
            </div>

            <!-- Profile Info Content Area -->
            <div class="px-6 pb-6 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              
              <div class="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left w-full md:w-auto">
                <!-- Avatar with Ring -->
                <div class="relative shrink-0">
                  <img 
                    :src="currentProfile.avatarUrl" 
                    :alt="currentProfile.fullName"
                    class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-2xl bg-slate-200 dark:bg-slate-800"
                  />
                  <div 
                    class="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow-md border border-white/20"
                    :class="activeRole === 'student' ? 'bg-blue-600' : 'bg-purple-600'"
                  >
                    {{ activeRole === 'student' ? pTrans.studentTag : pTrans.teacherTag }}
                  </div>
                </div>

                <!-- User Details -->
                <div class="space-y-1.5 pb-1">
                  <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {{ currentProfile.fullName }}
                  </h1>
                  <p class="text-xs sm:text-sm font-semibold text-blue-200 dark:text-blue-300 flex items-center justify-center sm:justify-start gap-2">
                    <span class="material-symbols-outlined text-base">domain</span>
                    <span>{{ currentProfile.faculty }}</span>
                  </p>
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                    <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-mono font-bold text-slate-700 dark:text-slate-300">
                      ID: {{ currentProfile.idNumber }}
                    </span>
                    <span v-if="activeRole === 'student'" class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold">
                      {{ pTrans.group }}: {{ currentProfile.group }}
                    </span>
                    <span v-else class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold">
                      {{ pTrans.department }}: {{ currentProfile.department }}
                    </span>
                    <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      {{ activeRole === 'student' ? pTrans.activeStudent : pTrans.activeTeacher }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quick Action / Print Certificate Button -->
              <div class="w-full md:w-auto flex items-center gap-3">
                <button 
                  @click="showCertificateModal = true"
                  class="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer transform active:scale-95"
                >
                  <span class="material-symbols-outlined text-base">verified</span>
                  <span>{{ pTrans.certBtn }}</span>
                </button>
              </div>

            </div>
          </div>

          <!-- Academic Statistics Grid (HEMIS Metrics) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            
            <div v-for="(metric, idx) in currentMetrics" :key="idx" class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:border-blue-500/50 transition-all">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{ metric.title }}</span>
                <div :class="`w-8 h-8 rounded-lg ${metric.bgColor} ${metric.textColor} flex items-center justify-center`">
                  <span class="material-symbols-outlined text-lg">{{ metric.icon }}</span>
                </div>
              </div>
              <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {{ metric.value }}
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {{ metric.subtitle }}
              </p>
            </div>

          </div>

          <!-- Tabs Navigation: Detailed Info / Schedule / Subjects & Performance / Documents -->
          <div class="mb-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 overflow-x-auto pb-1">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = (tab.id as 'info' | 'schedule' | 'subjects' | 'documents')"
              :class="[
                activeTab === tab.id 
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold border-b-2' 
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white border-b-2 border-transparent',
                'pb-3 text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap'
              ]"
            >
              <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- TAB 1: HEMIS Profile Detailed Data Cards -->
          <div v-if="activeTab === 'info'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Personal Data Card -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">person</span>
                <span>{{ pTrans.personalCardTitle }}</span>
              </h3>
              <div class="space-y-3.5 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.fullNameLabel }}</span>
                  <span class="font-bold text-slate-900 dark:text-white text-right">{{ currentProfile.fullName }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.pinflLabel }}</span>
                  <span class="font-mono font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.pinfl }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.passportLabel }}</span>
                  <span class="font-mono font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.passport }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.birthDateLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.birthDate }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.genderLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">{{ pTrans.genderMale }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.phoneLabel }}</span>
                  <span class="font-mono font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Academic Data Card -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400">school</span>
                <span>{{ pTrans.academicCardTitle }}</span>
              </h3>
              <div class="space-y-3.5 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.facultyLabel }}</span>
                  <span class="font-bold text-slate-900 dark:text-white text-right max-w-[180px] truncate">{{ currentProfile.faculty }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.specialityLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200 text-right max-w-[180px] truncate">{{ currentProfile.speciality }}</span>
                </div>
                <div class="flex justify-between items-center" v-if="activeRole === 'student'">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.eduTypeLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.educationType }} ({{ currentProfile.educationForm }})</span>
                </div>
                <div class="flex justify-between items-center" v-else>
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.degreeLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.degree }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.academicYearLabel }}</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">{{ currentProfile.academicYear }} ({{ currentProfile.semester }}-semestr)</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.paymentLabel }}</span>
                  <span class="font-extrabold text-blue-600 dark:text-blue-400">{{ activeRole === 'student' ? pTrans.grantText : pTrans.staffPaymentText }}</span>
                </div>
              </div>
            </div>

            <!-- System & SSO Access Security Card -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span class="material-symbols-outlined text-amber-500">lock_reset</span>
                <span>{{ pTrans.systemCardTitle }}</span>
              </h3>
              <div class="space-y-3.5 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.loginLabel }}</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">{{ currentProfile.login }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.oneIdLabel }}</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">{{ pTrans.oneIdConnected }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 dark:text-slate-400">{{ pTrans.lastAuthLabel }}</span>
                  <span class="font-mono text-slate-600 dark:text-slate-400">{{ pTrans.lastAuthValue }}</span>
                </div>
                <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {{ pTrans.securityDesc }}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- TAB 2: Weekly Schedule Timetable (HEMIS REST API /education/schedule) -->
          <div v-else-if="activeTab === 'schedule'" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden p-5">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">calendar_month</span>
                  <span>{{ pTrans.scheduleTitle }}</span>
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ pTrans.semesterSub }}</p>
              </div>

              <!-- Day Switcher Pills -->
              <div class="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
                <button 
                  v-for="(day, dIdx) in scheduleDays" 
                  :key="dIdx"
                  @click="activeDayIndex = dIdx"
                  :class="[
                    activeDayIndex === dIdx
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium',
                    'px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer'
                  ]"
                >
                  {{ day }}
                </button>
              </div>
            </div>

            <!-- Schedule Items for Selected Day -->
            <div v-if="currentDaySchedule.length > 0" class="space-y-3">
              <div 
                v-for="(item, sIdx) in currentDaySchedule" 
                :key="sIdx"
                class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-blue-500/50 transition-all"
              >
                <div class="flex items-center gap-4">
                  <!-- Time Badge -->
                  <div class="px-3 py-2 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs shrink-0 text-center border border-blue-500/20">
                    <span class="material-symbols-outlined text-sm block mb-0.5">schedule</span>
                    <span>{{ item.time }}</span>
                  </div>

                  <div>
                    <h4 class="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{{ item.subject }}</span>
                      <span 
                        class="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                        :class="item.type === 'Ma\'ruza' || item.type === 'Лекция' || item.type === 'Lecture' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'"
                      >
                        {{ item.type }}
                      </span>
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                      <span class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm text-slate-400">person</span>
                        <span>{{ item.teacherOrGroup }}</span>
                      </span>
                    </p>
                  </div>
                </div>

                <div class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
                  <span class="material-symbols-outlined text-sm text-blue-500">location_on</span>
                  <span>{{ item.room }}</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12 text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">event_busy</span>
              <p class="text-xs font-semibold">{{ pTrans.noClassesText }}</p>
            </div>

          </div>

          <!-- TAB 3: Subjects & Grades / Academic Load -->
          <div v-else-if="activeTab === 'subjects'" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
            <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">
                  {{ activeRole === 'student' ? pTrans.studentTableTitle : pTrans.teacherTableTitle }}
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ pTrans.semesterSub }}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                {{ currentSubjects.length }} {{ pTrans.subjectCountSuffix }}
              </span>
            </div>

            <!-- Subjects Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  <tr>
                    <th class="p-4">{{ pTrans.thSubject }}</th>
                    <th class="p-4">{{ pTrans.thTeacherOrGroup }}</th>
                    <th class="p-4 text-center">{{ pTrans.thCredits }}</th>
                    <th class="p-4 text-center">{{ pTrans.thJn }}</th>
                    <th class="p-4 text-center">{{ pTrans.thOn }}</th>
                    <th class="p-4 text-center">{{ pTrans.thYn }}</th>
                    <th class="p-4 text-center">{{ pTrans.thTotal }}</th>
                    <th class="p-4 text-center">{{ pTrans.thGrade }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                  <tr v-for="(subject, i) in currentSubjects" :key="i" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="p-4 font-bold text-slate-900 dark:text-white">
                      {{ subject.name }}
                    </td>
                    <td class="p-4 text-slate-600 dark:text-slate-400">
                      {{ subject.teacherOrGroup }}
                    </td>
                    <td class="p-4 text-center font-mono font-bold">
                      {{ subject.credits }}
                    </td>
                    <td class="p-4 text-center font-mono">
                      {{ subject.jn }} / 40
                    </td>
                    <td class="p-4 text-center font-mono">
                      {{ subject.on }} / 20
                    </td>
                    <td class="p-4 text-center font-mono">
                      {{ subject.yn }} / 40
                    </td>
                    <td class="p-4 text-center font-mono font-extrabold text-blue-600 dark:text-blue-400">
                      {{ subject.totalScore }}
                    </td>
                    <td class="p-4 text-center">
                      <span 
                        class="px-2.5 py-1 rounded-lg text-xs font-black uppercase"
                        :class="getGradeClass(subject.grade)"
                      >
                        {{ subject.grade }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB 4: Official Documents & Certificates -->
          <div v-else-if="activeTab === 'documents'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-xl">description</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">{{ pTrans.doc1Title }}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {{ pTrans.doc1Desc }}
                </p>
              </div>
              <button 
                @click="showCertificateModal = true"
                class="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-bold transition-all text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">download</span>
                <span>{{ pTrans.doc1Action }}</span>
              </button>
            </div>

            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-xl">history_edu</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">{{ pTrans.doc2Title }}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {{ pTrans.doc2Desc }}
                </p>
              </div>
              <button 
                class="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-xs font-bold transition-all text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">visibility</span>
                <span>{{ pTrans.doc2Action }}</span>
              </button>
            </div>

            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-xl">payments</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">{{ pTrans.doc3Title }}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {{ pTrans.doc3Desc }}
                </p>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs text-center border border-emerald-500/20">
                {{ pTrans.doc3Badge }}
              </div>
            </div>

          </div>

        </main>

        <!-- Official Certificate QR Modal -->
        <Transition name="modal">
          <div v-if="showCertificateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
                  <span class="material-symbols-outlined text-blue-600">verified</span>
                  <span>{{ pTrans.modalTitle }}</span>
                </div>
                <button @click="showCertificateModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <span class="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <!-- Certificate Preview Box -->
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-center space-y-3">
                <div class="w-16 h-16 mx-auto rounded-xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                  N
                </div>
                <div>
                  <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">{{ pTrans.modalUni }}</h4>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ pTrans.modalMinistry }}</p>
                </div>

                <div class="pt-2 text-left space-y-1 text-xs border-t border-slate-200 dark:border-slate-700">
                  <p><span class="font-bold">{{ pTrans.modalIssuedTo }}</span> {{ currentProfile.fullName }}</p>
                  <p><span class="font-bold">{{ pTrans.modalStatus }}</span> {{ activeRole === 'student' ? pTrans.studentTag : pTrans.teacherTag }} ({{ currentProfile.faculty }})</p>
                  <p><span class="font-bold">{{ pTrans.modalDocNo }}</span> <span class="font-mono font-bold text-blue-600">HEMIS-2026-{{ currentProfile.idNumber }}</span></p>
                </div>

                <!-- QR Code Representation -->
                <div class="pt-2 flex flex-col items-center justify-center">
                  <div class="w-28 h-28 bg-white p-2 rounded-xl border border-slate-300 shadow-inner flex items-center justify-center">
                    <span class="material-symbols-outlined text-6xl text-slate-800">qr_code_2</span>
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono mt-1">QR verification: hemis.namdtu.uz/verify/{{ currentProfile.idNumber }}</span>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <button 
                  @click="showCertificateModal = false"
                  class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:shadow-lg transition-all cursor-pointer"
                >
                  {{ pTrans.modalDownload }}
                </button>
                <button 
                  @click="showCertificateModal = false"
                  class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  {{ pTrans.modalClose }}
                </button>
              </div>

            </div>
          </div>
        </Transition>

        <!-- Page Footer -->
        <HomeFooter website-url="https://namdtu.uz/" />
        <ScrollToTop />

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '../modules/home/components/AppHeader.vue';
import HomeFooter from '../modules/home/components/HomeFooter.vue';
import ScrollToTop from '../modules/home/components/ScrollToTop.vue';
import { useAuth } from '../composables/useAuth';
import { useApp } from '../composables/useApp';
import { useHemisApi } from '../composables/useHemisApi';

const { user, token } = useAuth();
const { locale } = useApp();
const { fetchAccountMe, fetchSchedule, fetchPerformance, fetchAttendance } = useHemisApi();

const liveProfile = ref<any>(null);
const liveSchedule = ref<any>(null);
const livePerformance = ref<any>(null);
const liveAttendance = ref<any>(null);

const activeRole = ref<'student' | 'teacher'>('student');
const activeTab = ref<'info' | 'schedule' | 'subjects' | 'documents'>('info');
const activeDayIndex = ref<number>(0);
const showCertificateModal = ref<boolean>(false);

// Multi-language reactive dictionary for Profile Page
const pTrans = computed(() => {
  const l = locale.value;
  if (l === 'ru') {
    return {
      title: "Интерфейс Профиля HEMIS",
      subtitle: "Персональные и академические данные студента и преподавателя из системы HEMIS",
      studentRole: "Профиль Студента",
      teacherRole: "Профиль Преподавателя",
      studentTag: "Студент",
      teacherTag: "Преподаватель",
      certBtn: "Справка HEMIS (QR-код)",
      group: "Группа",
      department: "Кафедра",
      activeStudent: "Активный студент",
      activeTeacher: "Активный преподаватель",

      // Tabs
      tabInfo: "Личные и Академические Данные",
      tabSchedule: "Расписание Занятий",
      tabSubjects: "Ведомость Дисциплин и Оценок",
      tabDocs: "Документы и Справки",

      // Schedule Tab
      scheduleTitle: "Недельное Расписание Занятий (HEMIS)",
      noClassesText: "В этот день занятий не запланировано",

      // Personal Data Card
      personalCardTitle: "Личные Данные",
      fullNameLabel: "Ф.И.О.:",
      pinflLabel: "ПИНФЛ:",
      passportLabel: "Паспорт:",
      birthDateLabel: "Дата рождения:",
      genderLabel: "Пол:",
      phoneLabel: "Телефон:",
      genderMale: "Мужской",

      // Academic Data Card
      academicCardTitle: "Академические Данные",
      facultyLabel: "Факультет:",
      specialityLabel: "Специальность:",
      eduTypeLabel: "Вид и форма обучения:",
      degreeLabel: "Ученая степень и звание:",
      academicYearLabel: "Учебный год и Семестр:",
      paymentLabel: "Тип финансирования:",
      grantText: "Государственный Грант",
      staffPaymentText: "Профессор-преподаватель",

      // System Card
      systemCardTitle: "Система HEMIS и Доступ",
      loginLabel: "Логин HEMIS:",
      oneIdLabel: "Интеграция OneID:",
      oneIdConnected: "Успешно подключено",
      lastAuthLabel: "Последняя Авторизация:",
      lastAuthValue: "Сегодня, 08:45",
      securityDesc: "Ваш аккаунт защищен единым шлюзом аутентификации SSO NamDTU HUB.",

      // Table
      studentTableTitle: "Дисциплины и Оценки Текущего Семестра",
      teacherTableTitle: "Преподаваемые Дисциплины и Учебная Нагрузка",
      semesterSub: "2025-2026 учебный год, 6-семестр",
      subjectCountSuffix: "Предметов",
      thSubject: "Название предмета",
      thTeacherOrGroup: "Преподаватель / Группа",
      thCredits: "Кредит (ECTS)",
      thJn: "ТК (Текущий)",
      thOn: "РК (Рубежный)",
      thYn: "ИК (Итоговый)",
      thTotal: "Общий балл",
      thGrade: "Оценка",

      // Documents
      doc1Title: "Справка с места учебы",
      doc1Desc: "Официальная справка с QR-кодом (С электронно-цифровой подписью).",
      doc1Action: "Скачать (PDF)",
      doc2Title: "Академический транскрипт (Зачетная книжка)",
      doc2Desc: "Ведомость оценок и кредитов ECTS за все семестры.",
      doc2Action: "Просмотреть и распечатать",
      doc3Title: "Статус Контракта и Договора",
      doc3Desc: "Оплата контракта на 2025-2026 учебный год (100% оплачено / Грант).",
      doc3Badge: "✓ Задолженности нет",

      // Modal
      modalTitle: "Официальная Справка HEMIS",
      modalUni: "Наманганский Государственный Технический Университет",
      modalMinistry: "Министерство высшего образования, науки и инноваций РУз",
      modalIssuedTo: "Выдано:",
      modalStatus: "Статус:",
      modalDocNo: "Номер документа:",
      modalClose: "Закрыть",
      modalDownload: "Скачать (PDF)",

      // Metrics Student
      gpaTitle: "Средний GPA",
      gpaSub: "Отличный академический показатель",
      creditsTitle: "Всего Кредитов",
      creditsSub: "Накопленные кредиты ECTS",
      attendTitle: "Процент Посещаемости",
      attendSub: "Всего 8 часов пропуска",
      rankTitle: "Место в Группе",
      rankVal: "#2 место",
      rankSub: "Среди 28 студентов",

      // Metrics Teacher
      loadTitle: "Учебная Нагрузка",
      loadVal: "480 часов",
      loadSub: "Годовой план 2025-2026",
      groupsTitle: "Закрепленные Группы",
      groupsVal: "4 группы",
      groupsSub: "Всего 114 студентов",
      articlesTitle: "Научные Статьи",
      articlesVal: "18 статей",
      articlesSub: "Журналы Scopus & ВАК",
      scopusTitle: "Scopus h-index",
      scopusSub: "Международное цитирование",
    };
  } else if (l === 'en') {
    return {
      title: "HEMIS Profile Interface",
      subtitle: "Personal and academic statistics of student and teacher in HEMIS system",
      studentRole: "Student Profile",
      teacherRole: "Teacher Profile",
      studentTag: "Student",
      teacherTag: "Teacher",
      certBtn: "HEMIS Certificate (QR Code)",
      group: "Group",
      department: "Department",
      activeStudent: "Active Student",
      activeTeacher: "Active Teacher",

      // Tabs
      tabInfo: "Personal & Academic Info",
      tabSchedule: "Lesson Timetable",
      tabSubjects: "Subjects & Grade Sheet",
      tabDocs: "Documents & Certificates",

      // Schedule Tab
      scheduleTitle: "Weekly Lesson Timetable (HEMIS)",
      noClassesText: "No classes scheduled for this day",

      // Personal Data Card
      personalCardTitle: "Personal Information",
      fullNameLabel: "Full Name:",
      pinflLabel: "PINFL:",
      passportLabel: "Passport No.:",
      birthDateLabel: "Date of Birth:",
      genderLabel: "Gender:",
      phoneLabel: "Phone:",
      genderMale: "Male",

      // Academic Data Card
      academicCardTitle: "Academic Information",
      facultyLabel: "Faculty:",
      specialityLabel: "Specialty:",
      eduTypeLabel: "Education Type & Form:",
      degreeLabel: "Academic Degree & Rank:",
      academicYearLabel: "Academic Year & Sem.:",
      paymentLabel: "Funding Type:",
      grantText: "State Grant",
      staffPaymentText: "Faculty Staff",

      // System Card
      systemCardTitle: "HEMIS System & Access",
      loginLabel: "HEMIS Login:",
      oneIdLabel: "OneID Integration:",
      oneIdConnected: "Successfully Connected",
      lastAuthLabel: "Last Authorization:",
      lastAuthValue: "Today, 08:45",
      securityDesc: "Your account is secured via NamDTU HUB single SSO authentication gateway.",

      // Table
      studentTableTitle: "Current Semester Subjects & Grades",
      teacherTableTitle: "Taught Subjects & Academic Load",
      semesterSub: "2025-2026 Academic Year, Semester 6",
      subjectCountSuffix: "Subjects",
      thSubject: "Subject Name",
      thTeacherOrGroup: "Teacher / Group",
      thCredits: "Credits (ECTS)",
      thJn: "CA (Current)",
      thOn: "MA (Midterm)",
      thYn: "FE (Final Exam)",
      thTotal: "Total Score",
      thGrade: "Grade",

      // Documents
      doc1Title: "Enrollment Certificate",
      doc1Desc: "Official certificate with QR Code (Digitally signed).",
      doc1Action: "Download (PDF)",
      doc2Title: "Academic Transcript (Grade Book)",
      doc2Desc: "Statement of grades and ECTS credits for all semesters.",
      doc2Action: "View & Print",
      doc3Title: "Contract & Tuition Status",
      doc3Desc: "2025-2026 Academic year tuition (100% Paid / State Grant).",
      doc3Badge: "✓ No Arrears",

      // Modal
      modalTitle: "Official HEMIS Certificate",
      modalUni: "Namangan State Technical University",
      modalMinistry: "Ministry of Higher Education, Science and Innovations of Uzbekistan",
      modalIssuedTo: "Issued to:",
      modalStatus: "Status:",
      modalDocNo: "Document No.:",
      modalClose: "Close",
      modalDownload: "Download (PDF)",

      // Metrics Student
      gpaTitle: "Average GPA",
      gpaSub: "Excellent academic performance",
      creditsTitle: "Total Credits",
      creditsSub: "Accumulated ECTS credits",
      attendTitle: "Attendance Rate",
      attendSub: "Total 8 hours absent",
      rankTitle: "Rank in Group",
      rankVal: "#2 Rank",
      rankSub: "Among 28 students",

      // Metrics Teacher
      loadTitle: "Teaching Load",
      loadVal: "480 hours",
      loadSub: "2025-2026 annual plan",
      groupsTitle: "Assigned Groups",
      groupsVal: "4 groups",
      groupsSub: "Total 114 students",
      articlesTitle: "Research Articles",
      articlesVal: "18 articles",
      articlesSub: "Scopus & OAK journals",
      scopusTitle: "Scopus h-index",
      scopusSub: "International citations",
    };
  }

  // Default: Uzbek
  return {
    title: "HEMIS Profil Interfeysi",
    subtitle: "HEMIS tizimidagi talaba va o'qituvchi shaxsiy ma'lumotlari hamda akademik statistikasi",
    studentRole: "Talaba Profili",
    teacherRole: "O'qituvchi Profili",
    studentTag: "Talaba",
    teacherTag: "O'qituvchi",
    certBtn: "HEMIS Ma'lumotnoma (QR Code)",
    group: "Guruh",
    department: "Kafedra",
    activeStudent: "Faol Talaba",
    activeTeacher: "Faol O'qituvchi",

    // Tabs
    tabInfo: "Shaxsiy & Akademik Ma'lumotlar",
    tabSchedule: "Dars Jadvali",
    tabSubjects: "Fanlar & Baholar Vedomosti",
    tabDocs: "Hujjatlar & Ma'lumotnomalar",

    // Schedule Tab
    scheduleTitle: "Haftalik Dars Jadvali (HEMIS)",
    noClassesText: "Ushbu kunda darslar rejalashtirilmagan",

    // Personal Data Card
    personalCardTitle: "Shaxsiy Ma'lumotlar",
    fullNameLabel: "F.I.SH.:",
    pinflLabel: "JSHSHIR (PINFL):",
    passportLabel: "Pasport seriya/nomer:",
    birthDateLabel: "Tug'ilgan sana:",
    genderLabel: "Jinsi:",
    phoneLabel: "Telefon:",
    genderMale: "Erkak",

    // Academic Data Card
    academicCardTitle: "Akademik Ma'lumotlar",
    facultyLabel: "Fakultet:",
    specialityLabel: "Yo'nalish:",
    eduTypeLabel: "Ta'lim turi & shakli:",
    degreeLabel: "Ilmiy Unvon & Daraja:",
    academicYearLabel: "O'quv yili & Semestr:",
    paymentLabel: "Moliyalashtirish turi:",
    grantText: "Davlat Granti",
    staffPaymentText: "Professor-o'qituvchi",

    // System Card
    systemCardTitle: "HEMIS Tizim va Kirish",
    loginLabel: "HEMIS Login:",
    oneIdLabel: "OneID Integratsiyasi:",
    oneIdConnected: "Muvaffaqiyatli ulangan",
    lastAuthLabel: "Oxirgi Avtorizatsiya:",
    lastAuthValue: "Bugun, 08:45",
    securityDesc: "Sizning hisobingiz NamDTU HUB yagona SSO autentifikatsiya shlyuzi orqali himoyalangan.",

    // Table
    studentTableTitle: "Joriy Semestr Fanlari va Baholar",
    teacherTableTitle: "O'qitiladigan Fanlar va O'quv Yuklamasi",
    semesterSub: "2025-2026 o'quv yili, 6-semestr",
    subjectCountSuffix: "ta Fan",
    thSubject: "Fan Nomi",
    thTeacherOrGroup: "O'qituvchi / Guruh",
    thCredits: "Kredit (ECTS)",
    thJn: "JN (Joriy)",
    thOn: "ON (Oraliq)",
    thYn: "YN (Yakuniy)",
    thTotal: "Umumiy Ball",
    thGrade: "Baho",

    // Documents
    doc1Title: "O'qish joyidan ma'lumotnoma",
    doc1Desc: "QR-kodli rasmiy ma'lumotnoma (Elektron raqamli imzo bilan).",
    doc1Action: "Yuklab olish (PDF)",
    doc2Title: "Akademik transkript (Reyting daftarchasi)",
    doc2Desc: "Barcha semestrlar bo'yicha baholar va ECTS kreditlar vedomosti.",
    doc2Action: "Ko'rish va chop etish",
    doc3Title: "Kontrakt va Shartnoma Statusi",
    doc3Desc: "2025-2026 o'quv yili kontrakt to'lovi (100% to'langan / Davlat Granti).",
    doc3Badge: "✓ Qarzdorlik yo'q",

    // Modal
    modalTitle: "HEMIS Rasmiy Ma'lumotnoma",
    modalUni: "Namangan Davlat Texnika Universiteti",
    modalMinistry: "O'zbekiston Respublikasi Oliy Ta'lim, Fan va Innovatsiyalar Vazirligi",
    modalIssuedTo: "Berildi:",
    modalStatus: "Maqom:",
    modalDocNo: "Hujjat raqami:",
    modalClose: "Yopish",
    modalDownload: "Yuklab olish (PDF)",

    // Metrics Student
    gpaTitle: "O'rtacha GPA",
    gpaSub: "A'lo akademik ko'rsatkich",
    creditsTitle: "Jami Kreditlar",
    creditsSub: "ECTS kreditlar jamg'armasi",
    attendTitle: "Davomat Foizi",
    attendSub: "Jami 8 soat sababsiz",
    rankTitle: "Guruhdagi O'rni",
    rankVal: "#2-o'rin",
    rankSub: "28 nafar talaba orasida",

    // Metrics Teacher
    loadTitle: "O'quv Yuklamasi",
    loadVal: "480 soat",
    loadSub: "2025-2026 yillik reja",
    groupsTitle: "Biriktirilgan Guruhlar",
    groupsVal: "4 ta guruh",
    groupsSub: "Jami 114 nafar talaba",
    articlesTitle: "Ilmiy Maqolalar",
    articlesVal: "18 ta",
    articlesSub: "Scopus & OAK jurnallari",
    scopusTitle: "Scopus h-index",
    scopusSub: "Xalqaro iqtiboslik",
  };
});

// Initialize role and fetch live HEMIS data if token is active
onMounted(async () => {
  if (user.value?.role === 'teacher') {
    activeRole.value = 'teacher';
  } else {
    activeRole.value = 'student';
  }

  if (token.value) {
    try {
      const [meData, schedData, perfData, attData] = await Promise.all([
        fetchAccountMe(),
        fetchSchedule(),
        fetchPerformance(),
        fetchAttendance(),
      ]);

      if (meData) liveProfile.value = meData;
      if (schedData) liveSchedule.value = schedData;
      if (perfData) livePerformance.value = perfData;
      if (attData) liveAttendance.value = attData;
    } catch (err) {
      console.warn("Live HEMIS API fetch notice:", err);
    }
  }
});

const tabs = computed(() => [
  { id: 'info', label: pTrans.value.tabInfo, icon: 'person' },
  { id: 'schedule', label: pTrans.value.tabSchedule, icon: 'calendar_month' },
  { id: 'subjects', label: pTrans.value.tabSubjects, icon: 'menu_book' },
  { id: 'documents', label: pTrans.value.tabDocs, icon: 'folder_shared' },
]);

const scheduleDays = computed(() => {
  const l = locale.value;
  if (l === 'ru') {
    return ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  } else if (l === 'en') {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }
  return ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
});

interface UserProfileData {
  fullName: string;
  idNumber: string;
  pinfl: string;
  passport: string;
  birthDate: string;
  gender: string;
  phone: string;
  faculty: string;
  speciality: string;
  group?: string;
  department?: string;
  degree?: string;
  semester: number;
  academicYear: string;
  educationType: string;
  educationForm: string;
  paymentType: string;
  status: string;
  login: string;
  avatarUrl: string;
}

// Student Mock/Real Data
const studentData: UserProfileData = {
  fullName: user.value?.fullName || "Ibragimov Otabek Rustamovich",
  idNumber: user.value?.studentId || "3102100452",
  pinfl: "32809012340089",
  passport: "FA 8492019",
  birthDate: "14.05.2003",
  gender: "Erkak",
  phone: "+998 93 490 88 77",
  faculty: user.value?.faculty || "Axborot Texnologiyalari va Kompyuter Injiniringi",
  speciality: "60710100 - Kompyuter Injiniringi (AT-servis)",
  group: user.value?.group || "310-21 KI",
  semester: 6,
  academicYear: "2025-2026",
  educationType: "Bakalavr",
  educationForm: "Kunduzgi",
  paymentType: "Davlat Granti",
  status: "Faol Talaba",
  login: user.value?.id || "3102100452",
  avatarUrl: user.value?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
};

// Teacher Mock Data
const teacherData: UserProfileData = {
  fullName: "Prof. Karimov Jamshid Abdullayevich",
  idNumber: "EMP-94021",
  pinfl: "31504829100044",
  passport: "AA 4901928",
  birthDate: "22.11.1981",
  gender: "Erkak",
  phone: "+998 90 215 33 22",
  faculty: "Axborot Texnologiyalari va Dasturlash",
  speciality: "Sun'iy Intellekt va Neyron Tarmog'i",
  department: "Axborot Texnologiyalari Kafedrasi",
  degree: "DSc, Professor (Ph.D)",
  semester: 6,
  academicYear: "2025-2026",
  educationType: "O'qituvchi",
  educationForm: "Asosiy Shtat",
  paymentType: "Professor-o'qituvchi",
  status: "Faol O'qituvchi",
  login: "j.karimov_namdtu",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
};

const currentProfile = computed<UserProfileData>(() => {
  if (liveProfile.value) {
    const p = liveProfile.value;
    return {
      fullName: p.full_name || p.name || `${p.first_name || ''} ${p.second_name || ''}`.trim() || user.value?.fullName || '',
      idNumber: p.student_id_number || p.employee_id || p.id || user.value?.studentId || '',
      pinfl: p.pinfl || p.passport_pinfl || '32809012340089',
      passport: p.passport_number || p.passport || 'FA 8492019',
      birthDate: p.birth_date || '14.05.2003',
      gender: p.gender?.name || p.gender || 'Erkak',
      phone: p.phone || p.mobile_phone || '+998 93 490 88 77',
      faculty: p.faculty?.name || p.faculty || user.value?.faculty || '',
      speciality: p.specialty?.name || p.speciality || '',
      group: p.group?.name || p.group || user.value?.group || '',
      department: p.department?.name || p.department || '',
      degree: p.degree?.name || p.degree || '',
      semester: p.semester?.code || 6,
      academicYear: p.academic_year?.name || '2025-2026',
      educationType: p.educationType?.name || 'Bakalavr',
      educationForm: p.educationForm?.name || 'Kunduzgi',
      paymentType: p.paymentType?.name || 'Davlat Granti',
      status: p.status?.name || 'Faol Talaba',
      login: p.login || user.value?.id || '',
      avatarUrl: p.image || p.avatar || user.value?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };
  }

  return activeRole.value === 'student' ? studentData : teacherData;
});

const currentMetrics = computed(() => {
  const t = pTrans.value;
  if (activeRole.value === 'student') {
    const gpaVal = livePerformance.value?.gpa || livePerformance.value?.summary?.gpa || liveProfile.value?.gpa || "4.38";
    const creditsVal = livePerformance.value?.total_credits || livePerformance.value?.summary?.total_credits || "148";
    const attendVal = liveAttendance.value?.percentage || liveAttendance.value?.summary?.percentage || "96.4%";
    const rankVal = liveProfile.value?.rank ? `#${liveProfile.value.rank}-o'rin` : t.rankVal;

    return [
      { title: t.gpaTitle, value: `${gpaVal} / 5.0`, subtitle: t.gpaSub, icon: 'grade', bgColor: 'bg-emerald-50 dark:bg-emerald-950', textColor: 'text-emerald-600 dark:text-emerald-400' },
      { title: t.creditsTitle, value: `${creditsVal} / 240`, subtitle: t.creditsSub, icon: 'stars', bgColor: 'bg-blue-50 dark:bg-blue-950', textColor: 'text-blue-600 dark:text-blue-400' },
      { title: t.attendTitle, value: typeof attendVal === 'number' ? `${attendVal}%` : attendVal, subtitle: t.attendSub, icon: 'fact_check', bgColor: 'bg-purple-50 dark:bg-purple-950', textColor: 'text-purple-600 dark:text-purple-400' },
      { title: t.rankTitle, value: rankVal, subtitle: t.rankSub, icon: 'leaderboard', bgColor: 'bg-amber-50 dark:bg-amber-950', textColor: 'text-amber-600 dark:text-amber-400' },
    ];
  } else {
    return [
      { title: t.loadTitle, value: liveProfile.value?.academic_load || t.loadVal, subtitle: t.loadSub, icon: 'schedule', bgColor: 'bg-blue-50 dark:bg-blue-950', textColor: 'text-blue-600 dark:text-blue-400' },
      { title: t.groupsTitle, value: t.groupsVal, subtitle: t.groupsSub, icon: 'groups', bgColor: 'bg-indigo-50 dark:bg-indigo-950', textColor: 'text-indigo-600 dark:text-indigo-400' },
      { title: t.articlesTitle, value: t.articlesVal, subtitle: t.articlesSub, icon: 'article', bgColor: 'bg-purple-50 dark:bg-purple-950', textColor: 'text-purple-600 dark:text-purple-400' },
      { title: t.scopusTitle, value: "h-index: 4", subtitle: t.scopusSub, icon: 'workspace_premium', bgColor: 'bg-amber-50 dark:bg-amber-950', textColor: 'text-amber-600 dark:text-amber-400' },
    ];
  }
});

// Student Weekly Timetable (HEMIS REST API /education/schedule)
const studentScheduleData = [
  // Day 0: Monday
  [
    { time: '08:30 - 09:50', subject: 'Veb-dasturlash (Vue.js & Node.js)', type: 'Ma\'ruza', teacherOrGroup: 'Prof. Karimov J.', room: '304-xona (B-bino)' },
    { time: '10:00 - 11:20', subject: 'Sun\'iy Intellekt asoslari', type: 'Amaliyot', teacherOrGroup: 'Dots. Axmedov M.', room: '212-xona (A-bino)' }
  ],
  // Day 1: Tuesday
  [
    { time: '08:30 - 09:50', subject: 'Ma\'lumotlar Ba\'zasi (PostgreSQL)', type: 'Laboratoriya', teacherOrGroup: 'Katt. o\'q. Usmonov S.', room: '405-xona (C-bino)' },
    { time: '10:00 - 11:20', subject: 'Kiberxavfsizlik asoslari', type: 'Ma\'ruza', teacherOrGroup: 'Dots. Raximov K.', room: '108-xona (A-bino)' }
  ],
  // Day 2: Wednesday
  [
    { time: '08:30 - 09:50', subject: 'Bulutli Texnologiyalar (DevOps)', type: 'Amaliyot', teacherOrGroup: 'Katt. o\'q. Mahmudov T.', room: '302-xona (B-bino)' }
  ],
  // Day 3: Thursday
  [
    { time: '11:30 - 12:50', subject: 'Veb-dasturlash (Vue.js & Node.js)', type: 'Laboratoriya', teacherOrGroup: 'Prof. Karimov J.', room: '401-xona (C-bino)' }
  ],
  // Day 4: Friday
  [
    { time: '08:30 - 09:50', subject: 'Sun\'iy Intellekt asoslari', type: 'Ma\'ruza', teacherOrGroup: 'Dots. Axmedov M.', room: '304-xona (B-bino)' }
  ],
  // Day 5: Saturday
  []
];

// Teacher Weekly Timetable
const teacherScheduleData = [
  // Day 0: Monday
  [
    { time: '08:30 - 09:50', subject: 'Veb-dasturlash (Vue.js & Node.js)', type: 'Ma\'ruza', teacherOrGroup: 'Guruh: 310-21 KI, 311-21 KI', room: '304-xona (B-bino)' }
  ],
  // Day 1: Tuesday
  [
    { time: '10:00 - 11:20', subject: 'Algoritmlar va Ma\'lumotlar Tuzilmasi', type: 'Amaliyot', teacherOrGroup: 'Guruh: 305-22 DI', room: '205-xona (A-bino)' }
  ],
  // Day 2: Wednesday
  [],
  // Day 3: Thursday
  [
    { time: '11:30 - 12:50', subject: 'Veb-dasturlash (Vue.js & Node.js)', type: 'Laboratoriya', teacherOrGroup: 'Guruh: 310-21 KI', room: '401-xona (C-bino)' }
  ],
  // Day 4: Friday
  [],
  // Day 5: Saturday
  []
];

const currentDaySchedule = computed(() => {
  if (liveSchedule.value) {
    const dayData = Array.isArray(liveSchedule.value) ? liveSchedule.value[activeDayIndex.value] : (liveSchedule.value[activeDayIndex.value] || liveSchedule.value.items);
    if (Array.isArray(dayData) && dayData.length > 0) {
      return dayData.map((item: any) => ({
        time: item.lesson_pair?.start_time ? `${item.lesson_pair.start_time} - ${item.lesson_pair.end_time}` : (item.time || '08:30 - 09:50'),
        subject: item.subject?.name || item.subject_name || item.subject || 'Fan',
        type: item.trainingType?.name || item.type || 'Ma\'ruza',
        teacherOrGroup: item.employee?.name || item.teacher_name || item.group?.name || item.teacherOrGroup || 'O\'qituvchi',
        room: item.auditorium?.name ? `${item.auditorium.name} (${item.building?.name || 'B-bino'})` : (item.room || '304-xona'),
      }));
    }
  }

  const scheduleSource = activeRole.value === 'student' ? studentScheduleData : teacherScheduleData;
  return scheduleSource[activeDayIndex.value] || [];
});

const studentSubjects = [
  { name: "Veb-dasturlash (Vue.js & Node.js)", teacherOrGroup: "Prof. Karimov J.", credits: 6, jn: 38, on: 19, yn: 37, totalScore: 94, grade: 'A' },
  { name: "Sun'iy Intellekt asoslari", teacherOrGroup: "Dots. Axmedov M.", credits: 5, jn: 36, on: 18, yn: 35, totalScore: 89, grade: 'A' },
  { name: "Ma'lumotlar Ba'zasi (PostgreSQL)", teacherOrGroup: "Katt. o'q. Usmonov S.", credits: 6, jn: 35, on: 17, yn: 34, totalScore: 86, grade: 'B+' },
  { name: "Kiberxavfsizlik asoslari", teacherOrGroup: "Dots. Raximov K.", credits: 5, jn: 34, on: 16, yn: 33, totalScore: 83, grade: 'B+' },
  { name: "Bulutli Texnologiyalar (DevOps)", teacherOrGroup: "Katt. o'q. Mahmudov T.", credits: 4, jn: 39, on: 20, yn: 38, totalScore: 97, grade: 'A+' },
];

const teacherSubjects = [
  { name: "Veb-dasturlash (Vue.js & Node.js)", teacherOrGroup: "310-21 KI, 311-21 KI", credits: 6, jn: 40, on: 20, yn: 40, totalScore: 100, grade: 'Faol' },
  { name: "Algoritmlar va Ma'lumotlar Tuzilmasi", teacherOrGroup: "305-22 DI, 306-22 DI", credits: 5, jn: 40, on: 20, yn: 40, totalScore: 100, grade: 'Faol' },
  { name: "Dasturiy Injiniring loyihalari", teacherOrGroup: "410-20 KI", credits: 6, jn: 40, on: 20, yn: 40, totalScore: 100, grade: 'Faol' },
];

const currentSubjects = computed(() => {
  if (livePerformance.value) {
    const list = Array.isArray(livePerformance.value) 
      ? livePerformance.value 
      : (livePerformance.value.items || livePerformance.value.subjects || []);
    if (list.length > 0) {
      return list.map((s: any) => ({
        name: s.subject?.name || s.subject_name || s.name || 'Fan',
        teacherOrGroup: s.employee?.name || s.teacher_name || s.group_name || s.teacherOrGroup || 'O\'qituvchi',
        credits: s.credit || s.credits || 5,
        jn: s.jn || s.current_grade || 0,
        on: s.on || s.midterm_grade || 0,
        yn: s.yn || s.final_grade || 0,
        totalScore: s.total_score || s.total || s.score || 0,
        grade: s.grade || s.grade_code || (s.total_score >= 90 ? 'A' : s.total_score >= 80 ? 'B+' : 'C+'),
      }));
    }
  }

  return activeRole.value === 'student' ? studentSubjects : teacherSubjects;
});

function getGradeClass(grade: string) {
  if (grade === 'A+' || grade === 'A' || grade === 'Faol') {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
  } else if (grade === 'B+' || grade === 'B') {
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
  } else {
    return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
  }
}
</script>

<style scoped>
ion-content {
  --background: #f8fafc;
}

:root.dark ion-content,
.dark ion-content {
  --background: #070c18;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
