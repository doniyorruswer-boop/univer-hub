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

    const cleanLogin = (loginInput || '').trim();
    const cleanPassword = (passwordInput || '').trim();

    if (!cleanLogin || !cleanPassword) {
      authError.value = "Login va parolni kiriting!";
      isLoading.value = false;
      return false;
    }

    if (cleanLogin.length > 50 || cleanPassword.length > 100) {
      authError.value = "Ma'lumotlar hajmi oshib ketdi.";
      isLoading.value = false;
      return false;
    }

    try {
      // 1. Direct call to NamDTU HUB Backend Gateway (which proxies directly to HEMIS OTM API)
      const response = await fetch('/api/auth/hemis-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: cleanLogin, password: cleanPassword, role: userRole }),
      }).catch(() => null);

      if (response) {
        const resData = await response.json().catch(() => ({}));
        if (response.ok && resData.success && resData.user) {
          setUserSession(resData.user, resData.token);
          closeLoginModal();
          return true;
        } else {
          authError.value = resData.message || "Login yoki parol noto'g'ri!";
          return false;
        }
      }

      authError.value = "Server bilan bog'lanishda xatolik!";
      return false;

    } catch (err: any) {
      authError.value = err?.message || "Ulanishda xatolik yuz berdi.";
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

  /**
   * Redirect to HEMIS OAuth 2.0 / OneID Login (Student or Teacher)
  /**
   * Redirect to HEMIS OAuth 2.0 / OneID Login (Student or Teacher)
   */
  async function redirectToHemisOAuth(role: 'student' | 'teacher' = 'student') {
    const redirectUri = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? `${window.location.origin}/home`
      : 'https://hub.namdtu.uz/home';
      
    try {
      const res = await fetch(`/api/auth/hemis-oauth-url?role=${role}&redirect_uri=${encodeURIComponent(redirectUri)}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
    } catch {}

    const clientId = import.meta.env.VITE_HEMIS_OAUTH_CLIENT_ID || '9';
    const baseUrl = role === 'teacher' ? 'https://hemis.namdtu.uz' : 'https://student.namdtu.uz';
    const authorizeUrl = `${baseUrl}/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authorizeUrl;
  }

  /**
   * Complete login using OAuth Authorization Code
   */
  async function loginWithOAuthCode(code: string): Promise<boolean> {
    isLoading.value = true;
    authError.value = null;

    const redirectUri = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? `${window.location.origin}/home`
      : 'https://hub.namdtu.uz/home';

    try {
      // Send authorization code to secure Backend Gateway
      const response = await fetch('/api/auth/hemis-oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri }),
      }).catch(() => null);

      if (response) {
        const resData = await response.json().catch(() => ({}));
        if (response.ok && resData.success && resData.user) {
          setUserSession(resData.user, resData.token);
          return true;
        } else {
          let msg = resData.message || "OAuth avtorizatsiyada xatolik yuz berdi.";
          if (msg.includes('<!DOCTYPE html') || msg.includes('451')) {
            msg = "HEMIS serveri faqat O'zbekiston IP manzillaridan ulanishga ruxsat beradi.";
          }
          authError.value = msg;
          return false;
        }
      }
      authError.value = "Server bilan bog'lanishda xatolik!";
      return false;
    } catch (err: any) {
      authError.value = err?.message || "OAuth ulanishida xatolik.";
      return false;
    } finally {
      isLoading.value = false;
    }
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
    redirectToHemisOAuth,
    loginWithOAuthCode,
    logout,
    getSsoRedirectUrl,
  };
}
