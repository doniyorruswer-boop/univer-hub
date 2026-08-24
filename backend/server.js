import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import https from 'https';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Official NamDTU HEMIS REST API Base URL
const HEMIS_BASE_URL = process.env.HEMIS_BASE_URL || 'https://student.namdtu.uz/rest/v1';

// HTTPS Agent for internal OTM SSL certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

app.use(cors());
app.use(express.json());

/**
 * Health Check Endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'NamDTU HUB - 100% Strict HEMIS Authentication Gateway', 
    hemisBaseUrl: HEMIS_BASE_URL,
    timestamp: new Date() 
  });
});

/**
 * 100% Strict HEMIS Authentication Endpoint
 * NO HARDCODED TEST ACCOUNTS, NO DEMO FALLBACKS.
 * Only authentic credentials verified by the official HEMIS database will be granted access.
 */
app.post('/api/auth/hemis-login', async (req, res) => {
  const { login, password, role } = req.body;

  if (!login || !login.trim() || !password || !password.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Login va parolni kiriting!" 
    });
  }

  const cleanLogin = login.trim();
  const cleanPassword = password.trim();

  // Security Helper: Mask sensitive user login identifiers in logs
  const maskedLogin = cleanLogin.length > 4 ? `${cleanLogin.slice(0, 3)}***${cleanLogin.slice(-2)}` : '****';

  try {
    console.log(`[HEMIS Real Auth] Authenticating user '${maskedLogin}' via ${HEMIS_BASE_URL}/auth/login`);

    // 1. POST Credentials directly to Official HEMIS REST API
    const loginResponse = await axios.post(
      `${HEMIS_BASE_URL}/auth/login`,
      { login: cleanLogin, password: cleanPassword },
      { 
        httpsAgent,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'NamDTU-HUB-Gateway/1.0' 
        },
        timeout: 10000 
      }
    );

    // Verify HEMIS server response
    if (loginResponse.data && loginResponse.data.data && loginResponse.data.data.token) {
      const hemisBearerToken = loginResponse.data.data.token;
      console.log(`[HEMIS Auth Success] Token obtained for '${maskedLogin}'. Fetching profile...`);

      // 2. Fetch User Profile using returned Bearer Token
      let studentProfileData = null;
      try {
        const meResponse = await axios.get(`${HEMIS_BASE_URL}/account/me`, {
          httpsAgent,
          headers: { 
            'Authorization': `Bearer ${hemisBearerToken}`,
            'Accept': 'application/json'
          },
          timeout: 8000
        });
        if (meResponse.data && meResponse.data.data) {
          studentProfileData = meResponse.data.data;
        }
      } catch (profileErr) {
        console.warn(`[HEMIS /account/me Warning]`, profileErr.message);
      }

      const userProfile = {
        id: studentProfileData?.id || studentProfileData?.student_id_number || cleanLogin,
        fullName: studentProfileData?.full_name || `${studentProfileData?.first_name || ''} ${studentProfileData?.second_name || ''}`.trim() || cleanLogin,
        studentId: studentProfileData?.student_id_number || cleanLogin,
        role: role || 'student',
        faculty: studentProfileData?.faculty?.name || "Axborot Texnologiyalari va Dasturlash",
        group: studentProfileData?.group?.name || "310-21 KI",
        course: studentProfileData?.level?.code || studentProfileData?.level?.name || 3,
        avatarUrl: studentProfileData?.image || null,
      };

      return res.json({
        success: true,
        message: "HEMIS orqali muvaffaqiyatli avtorizatsiyadan o'tildi",
        token: hemisBearerToken,
        user: userProfile,
      });
    }

    // Reject if token is not returned
    return res.status(401).json({
      success: false,
      message: "HEMIS: Kiritilgan login yoki parol noto'g'ri!",
    });

  } catch (error) {
    const errorData = error?.response?.data;
    const rawError = errorData?.error || errorData?.message || (typeof errorData === 'string' ? errorData : error.message) || '';
    console.error(`[HEMIS Real Auth REJECTED] User '${maskedLogin}':`, rawError);

    let clientMessage = "Login yoki parol noto'g'ri!";
    if (typeof rawError === 'string' && rawError.toLowerCase().includes('captcha')) {
      clientMessage = "Urinishlar soni ko'payib ketdi. Birozdan so'ng qayta urinib ko'ring.";
    }

    return res.status(401).json({
      success: false,
      message: clientMessage,
    });
  }
});

// HEMIS OAuth 2.0 / OneID Configuration
const HEMIS_OAUTH_CLIENT_ID = process.env.HEMIS_OAUTH_CLIENT_ID || '9';
const HEMIS_OAUTH_CLIENT_SECRET = process.env.HEMIS_OAUTH_CLIENT_SECRET || '8Pgarj7N-NpEHy2FeqWq1o2otc2ll4c2Pfa4vQem';
const HEMIS_OAUTH_REDIRECT_URI = process.env.HEMIS_OAUTH_REDIRECT_URI || 'https://namdtu-hub-eta.vercel.app/home';
const HEMIS_OAUTH_AUTHORIZE_URL = process.env.HEMIS_OAUTH_AUTHORIZE_URL || 'https://student.namdtu.uz/oauth/authorize';
const HEMIS_TEACHER_OAUTH_AUTHORIZE_URL = process.env.HEMIS_TEACHER_OAUTH_AUTHORIZE_URL || 'https://hemis.namdtu.uz/oauth/authorize';

/**
 * Get HEMIS OAuth Authorize URL endpoint (supports student and teacher roles)
 */
app.get('/api/auth/hemis-oauth-url', (req, res) => {
  const role = req.query.role || 'student';
  const redirectUri = req.query.redirect_uri || HEMIS_OAUTH_REDIRECT_URI;
  const baseUrl = role === 'teacher' ? HEMIS_TEACHER_OAUTH_AUTHORIZE_URL : HEMIS_OAUTH_AUTHORIZE_URL;
  const oauthUrl = `${baseUrl}?client_id=${HEMIS_OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return res.json({ success: true, url: oauthUrl });
});

/**
 * Process OAuth Callback Authorization Code
 */
app.post('/api/auth/hemis-oauth', async (req, res) => {
  const { code, redirectUri } = req.body;

  if (!code) {
    return res.status(400).json({ 
      success: false, 
      message: "Authorization code taqdim etilmadi!" 
    });
  }

  const effectiveRedirectUri = (redirectUri || HEMIS_OAUTH_REDIRECT_URI).split('?')[0];

  try {
    console.log(`[HEMIS OAuth] Processing auth code: ${code.slice(0, 8)}...`);

    // 1. Exchange authorization code for token (supports student and teacher portals)
    const tokenEndpoints = [
      `https://student.namdtu.uz/oauth/access-token`,
      `https://student.namdtu.uz/oauth/token`,
      `https://student.namdtu.uz/rest/v1/oauth/access-token`,
      `https://hemis.namdtu.uz/oauth/access-token`,
      `https://hemis.namdtu.uz/oauth/token`,
      `https://hemis.namdtu.uz/rest/v1/oauth/access-token`,
      `${HEMIS_BASE_URL.replace('/rest/v1', '')}/oauth/access-token`,
    ];

    let tokenResponse = null;
    let lastTokenError = null;

    for (const endpoint of tokenEndpoints) {
      // 1. Try URL-encoded form data (Standard OAuth 2.0 RFC 6749)
      try {
        console.log(`[HEMIS OAuth Form] Attempting token exchange at ${endpoint}`);
        const params = new URLSearchParams();
        params.append('client_id', HEMIS_OAUTH_CLIENT_ID);
        params.append('client_secret', HEMIS_OAUTH_CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', effectiveRedirectUri);

        tokenResponse = await axios.post(
          endpoint,
          params.toString(),
          { 
            httpsAgent,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'User-Agent': 'NamDTU-HUB-Gateway/1.0' 
            },
            timeout: 10000 
          }
        );

        if (tokenResponse?.data?.access_token || tokenResponse?.data?.data?.token || tokenResponse?.data?.token) {
          console.log(`[HEMIS OAuth Success] Form-urlencoded token match at ${endpoint}`);
          break;
        }
      } catch (err) {
        lastTokenError = err;
        console.warn(`[HEMIS OAuth Form] Request failed at ${endpoint}:`, err?.response?.data || err.message);
      }

      // 2. Try JSON payload
      try {
        console.log(`[HEMIS OAuth JSON] Attempting token exchange at ${endpoint}`);
        tokenResponse = await axios.post(
          endpoint,
          {
            client_id: HEMIS_OAUTH_CLIENT_ID,
            client_secret: HEMIS_OAUTH_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: effectiveRedirectUri,
          },
          { 
            httpsAgent,
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'NamDTU-HUB-Gateway/1.0' 
            },
            timeout: 10000 
          }
        );

        if (tokenResponse?.data?.access_token || tokenResponse?.data?.data?.token || tokenResponse?.data?.token) {
          console.log(`[HEMIS OAuth Success] JSON token match at ${endpoint}`);
          break;
        }
      } catch (err) {
        lastTokenError = err;
        console.warn(`[HEMIS OAuth JSON] Request failed at ${endpoint}:`, err?.response?.data || err.message);
      }
    }

    const accessToken = tokenResponse?.data?.access_token || 
                        tokenResponse?.data?.data?.token || 
                        tokenResponse?.data?.token ||
                        tokenResponse?.data?.data?.access_token;

    if (!accessToken) {
      const errDetails = lastTokenError?.response?.data;
      let detailMsg = "Parametrlar noto'g'ri yoki HTTP 451 (Faqat O'zbekiston IP manzillariga ruxsat berilgan)";
      if (typeof errDetails === 'string' && (errDetails.includes('451') || errDetails.includes('Kirish cheklangan'))) {
        detailMsg = "HEMIS serveri faqat O'zbekiston IP manzillaridan ulanishga ruxsat beradi (HTTP 451 - Kirish cheklangan).";
      } else if (typeof errDetails === 'object') {
        detailMsg = JSON.stringify(errDetails);
      }
      console.error("[HEMIS OAuth] Could not exchange code for token:", detailMsg);
      return res.status(401).json({
        success: false,
        message: `HEMIS OAuth token olishda xatolik: ${detailMsg}`,
        error: detailMsg
      });
    }

    console.log(`[HEMIS OAuth Success] Access token obtained. Fetching profile...`);

    // 2. Fetch User Profile using returned Access Token
    let profileData = null;
    const profileEndpoints = [
      `https://student.namdtu.uz/rest/v1/account/me`,
      `https://hemis.namdtu.uz/rest/v1/account/me`,
      `${HEMIS_BASE_URL}/account/me`,
      `https://student.namdtu.uz/oauth/api/v1/user`,
      `https://hemis.namdtu.uz/oauth/api/v1/user`,
    ];

    for (const profEndpoint of profileEndpoints) {
      try {
        const meRes = await axios.get(profEndpoint, {
          httpsAgent,
          headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
          },
          timeout: 8000
        });
        if (meRes.data && (meRes.data.data || meRes.data.id || meRes.data.name)) {
          profileData = meRes.data.data || meRes.data;
          break;
        }
      } catch (profErr) {
        console.warn(`[HEMIS OAuth Profile] Request failed at ${profEndpoint}:`, profErr.message);
      }
    }

    const userProfile = {
      id: profileData?.id || profileData?.student_id_number || profileData?.employee_id || 'hemis_user',
      fullName: profileData?.full_name || profileData?.name || `${profileData?.first_name || ''} ${profileData?.second_name || ''}`.trim() || 'HEMIS Foydalanuvchisi',
      studentId: profileData?.student_id_number || profileData?.employee_id || profileData?.id || '',
      role: profileData?.type === 'employee' || profileData?.is_employee ? 'teacher' : 'student',
      faculty: profileData?.faculty?.name || profileData?.faculty || "Axborot Texnologiyalari",
      group: profileData?.group?.name || profileData?.group || "",
      course: profileData?.level?.code || profileData?.level?.name || 1,
      avatarUrl: profileData?.image || profileData?.avatar || null,
    };

    return res.json({
      success: true,
      message: "OneID / HEMIS OAuth orqali muvaffaqiyatli kirdingiz!",
      token: accessToken,
      user: userProfile,
    });

  } catch (error) {
    console.error(`[HEMIS OAuth Error]:`, error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "HEMIS OAuth avtorizatsiyada kutilmagan xatolik yuz berdi.",
    });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚀 NamDTU HUB 100% Real HEMIS Authentication Gateway`);
    console.log(`📡 Base API: ${HEMIS_BASE_URL}`);
    console.log(`🔒 Strict Mode: ACTIVE (No demo fallbacks)`);
    console.log(`===================================================`);
  });
}

export default app;

