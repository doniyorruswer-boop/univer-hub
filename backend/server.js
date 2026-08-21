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
      message: "HEMIS Login va parolini kiritish majburiy!" 
    });
  }

  const cleanLogin = login.trim();
  const cleanPassword = password.trim();

  try {
    console.log(`[HEMIS Real Auth] Authenticating user '${cleanLogin}' via ${HEMIS_BASE_URL}/auth/login`);

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
      console.log(`[HEMIS Auth Success] Token obtained for '${cleanLogin}'. Fetching profile...`);

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
        hemisToken: hemisBearerToken,
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
    const errorMsg = error?.response?.data?.message || error?.response?.data?.data || error.message;
    console.error(`[HEMIS Real Auth REJECTED] User '${cleanLogin}':`, errorMsg);

    // STRICT REJECTION: NO FALLBACK, NO DUMMY LOGINS ACCEPTED!
    return res.status(401).json({
      success: false,
      message: "HEMIS: Kiritilgan login yoki parol noto'g'ri!",
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

