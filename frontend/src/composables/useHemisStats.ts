import { ref, onMounted } from 'vue';

export interface HemisUniversityStats {
  totalStudents: number;
  totalTeachers: number;
  totalFaculties: number;
  totalSpecialties: number;
  activePlatforms: number;
  supportAvailability: string;
  systemStatus: string;
}

const stats = ref<HemisUniversityStats>({
  totalStudents: 15480,
  totalTeachers: 685,
  totalFaculties: 8,
  totalSpecialties: 42,
  activePlatforms: 20,
  supportAvailability: "24/7",
  systemStatus: "Operational"
});

const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

export function useHemisStats() {
  async function fetchStats() {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch('/api/stats/summary').catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.success && data.stats) {
          stats.value = data.stats;
        }
      }
    } catch (err: any) {
      error.value = err?.message || "Statistikani yuklashda xatolik";
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchStats();
  });

  return {
    stats,
    isLoading,
    error,
    fetchStats,
  };
}
