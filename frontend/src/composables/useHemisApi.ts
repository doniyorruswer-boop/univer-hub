import { ref } from 'vue';
import { useAuth } from './useAuth';

export function useHemisApi() {
  const { token } = useAuth();
  const isLoading = ref<boolean>(false);
  const apiError = ref<string | null>(null);

  async function fetchHemisEndpoint(endpoint: string) {
    if (!token.value) {
      return null;
    }

    isLoading.value = true;
    apiError.value = null;

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    // 1. Try Direct HEMIS API endpoint from browser (Uzbekistan IP)
    const directUrl = `https://student.namdtu.uz/rest/v1/${cleanEndpoint}`;
    try {
      const res = await fetch(directUrl, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      }).catch(() => null);

      if (res && res.ok) {
        const json = await res.json().catch(() => ({}));
        isLoading.value = false;
        return json.data || json;
      }
    } catch {}

    // 2. Fallback to Backend Proxy
    try {
      const proxyUrl = `/api/hemis/${cleanEndpoint}`;
      const proxyRes = await fetch(proxyUrl, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      }).catch(() => null);

      if (proxyRes && proxyRes.ok) {
        const json = await proxyRes.json().catch(() => ({}));
        isLoading.value = false;
        return json.data || json;
      }
    } catch (err: any) {
      apiError.value = err?.message || "HEMIS API ulanishida xatolik";
    } finally {
      isLoading.value = false;
    }

    return null;
  }

  // GET /rest/v1/account/me
  async function fetchAccountMe() {
    return fetchHemisEndpoint('account/me');
  }

  // GET /rest/v1/education/schedule
  async function fetchSchedule() {
    return fetchHemisEndpoint('education/schedule');
  }

  // GET /rest/v1/education/performance
  async function fetchPerformance() {
    return fetchHemisEndpoint('education/performance');
  }

  // GET /rest/v1/education/attendance
  async function fetchAttendance() {
    return fetchHemisEndpoint('education/attendance');
  }

  return {
    isLoading,
    apiError,
    fetchHemisEndpoint,
    fetchAccountMe,
    fetchSchedule,
    fetchPerformance,
    fetchAttendance,
  };
}
