import { computed, ref } from 'vue';

export interface UserProfile {
  id: string;
  fullName: string;
  studentId?: string;
  role: 'student' | 'teacher' | 'staff';
  faculty?: string;
  group?: string;
  course?: number;
  avatarUrl?: string;
  hemisToken?: string;
}

const STORAGE_KEY_USER = 'namdtu_hub_user';
const STORAGE_KEY_TOKEN = 'namdtu_hub_token';

// Persistent Auth State
const user = ref<UserProfile | null>(loadStoredUser());
const token = ref<string | null>(localStorage.getItem(STORAGE_KEY_TOKEN));
const isLoginModalOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const authError = ref<string | null>(null);

function loadStoredUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const isLoggedIn = computed(() => !!user.value && !!token.value);

  function openLoginModal() {
    authError.value = null;
    isLoginModalOpen.value = true;
  }

  function closeLoginModal() {
    isLoginModalOpen.value = false;
    authError.value = null;
  }

  /**
   * Single Sign-On Authentication via HEMIS credentials
   */
  async function loginWithHemis(loginInput: string, passwordInput: string, userRole: 'student' | 'teacher' = 'student') {
    isLoading.value = true;
    authError.value = null;

    try {
      // 1. Direct call to NamDTU HUB Backend Gateway (which proxies directly to HEMIS OTM API)
      const response = await fetch('http://localhost:5000/api/auth/hemis-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, password: passwordInput, role: userRole }),
      }).catch(() => null);

      if (response) {
        const resData = await response.json().catch(() => ({}));
        if (response.ok && resData.success && resData.user) {
          setUserSession(resData.user, resData.token);
          closeLoginModal();
          return true;
        } else {
          authError.value = resData.message || "HEMIS: Kiritilgan login yoki parol noto'g'ri!";
          return false;
        }
      }

      authError.value = "HEMIS Backend xizmati bilan bog'lanishda xatolik!";
      return false;

    } catch (err: any) {
      authError.value = err?.message || "HEMIS tizimiga ulanishda xatolik yuz berdi.";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function setUserSession(newUser: UserProfile, newToken: string) {
    user.value = newUser;
    token.value = newToken;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  /**
   * Seamless SSO Redirection URL generator for Satellite Platforms
   */
  function getSsoRedirectUrl(platformBaseUrl: string, platformId?: string): string {
    if (!token.value) {
      return platformBaseUrl;
    }
    // Generate secure sso_token transfer URL
    const ssoToken = btoa(JSON.stringify({
      uid: user.value?.id,
      role: user.value?.role,
      ts: Date.now(),
      hToken: token.value,
    }));

    const hasQuery = platformBaseUrl.includes('?');
    return `${platformBaseUrl}${hasQuery ? '&' : '?'}sso_token=${encodeURIComponent(ssoToken)}&platform=${platformId || 'hub'}`;
  }

  return {
    user,
    token,
    isLoggedIn,
    isLoginModalOpen,
    isLoading,
    authError,
    openLoginModal,
    closeLoginModal,
    loginWithHemis,
    logout,
    getSsoRedirectUrl,
  };
}
