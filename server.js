// ==========================================================================
// GARUDA OS - High-Performance Server with Native SQLite & RFC 7519 JWT Auth
// ==========================================================================

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const bcrypt = require('./scripts/bcrypt.js');

// 1. Load Environment Variables from .env
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const env = {
    DB_CONNECTION: './data/garuda.db',
    JWT_SECRET: 'garuda_tactical_jwt_secret_key_2027_defence_upsc',
    PORT: '8080'
  };

  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        env[key] = val;
      }
    }
  }

  // Allow process.env override
  if (process.env.DB_CONNECTION) env.DB_CONNECTION = process.env.DB_CONNECTION;
  if (process.env.JWT_SECRET) env.JWT_SECRET = process.env.JWT_SECRET;
  if (process.env.PORT) env.PORT = process.env.PORT;

  return env;
}

const ENV = loadEnv();
const PORT = parseInt(ENV.PORT, 10) || 8080;
const DB_FILE = path.resolve(__dirname, ENV.DB_CONNECTION);
const JWT_SECRET = ENV.JWT_SECRET;

// Ensure data folder exists
const dbDir = path.dirname(DB_FILE);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// 2. Initialize SQLite Database & Tables
console.log(`[GARUDA DB] Connecting to SQLite at: ${DB_FILE}`);
const db = new DatabaseSync(DB_FILE);

// Enable WAL mode for performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Create required schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    target_goal TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS preferences (
    user_id TEXT PRIMARY KEY,
    theme TEXT DEFAULT 'dark',
    notification_settings TEXT,
    daily_schedule TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT PRIMARY KEY,
    mission_data TEXT NOT NULL,
    streaks INTEGER DEFAULT 1,
    completion_percentage INTEGER DEFAULT 0,
    reports TEXT DEFAULT '[]',
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

console.log('[GARUDA DB] Database tables verified (users, preferences, user_data).');

// Seed default cadet account (Manoj) if users table is empty
const defaultMissionsTemplate = {
  date: '2026-09-24',
  completionPercentage: 65,
  topPriorities: [
    { id: 'p1', title: 'UPSC Indian Polity: Fundamental Rights Weak-Area Revision & 15 MCQs', done: true },
    { id: 'p2', title: 'Fitness: Chest & Triceps Push Heavy Workout + 1600m Run', done: true },
    { id: 'p3', title: 'IT Career: Java HashMap Internal Working & Code 3 Programs', done: false }
  ],
  upsc: {
    subject: 'Indian Polity & Governance',
    topic: 'Fundamental Rights (Articles 12-35)',
    studyDurationMin: 180,
    mcqTarget: 20,
    mcqCompleted: 15,
    pyqTarget: 5,
    pyqCompleted: 5,
    answerWritingTarget: 1,
    answerWritingCompleted: 1,
    currentAffairsTask: 'Analyse Supreme Court ruling on Preventive Detention & Art 21',
    currentAffairsDone: true,
    revisionTask: 'Spaced Recall: Preamble 42nd Amendment & Kesavananda Case',
    revisionDone: true
  },
  army: {
    defenceAwareness: 'Learn 7 Army Commands, HQs and Comparative Tri-Service Ranks',
    doneAwareness: true,
    officerActivity: 'Read operational analysis of 1971 Longewala battle',
    doneOfficer: true,
    entryTask: 'Verify TGC-141 cutoffs for ECE branch on Join Indian Army portal',
    doneEntry: false
  },
  ssb: {
    oirReasoning: 'Complete 20 Verbal & Number Series practice questions',
    doneOir: true,
    ppdtPractice: 'Perceive hazy image, write 1 story within 3 minutes and narrate aloud',
    donePpdt: true,
    psychologyTask: 'Complete 15-word rapid-fire WAT simulator (15s/word)',
    donePsych: false,
    interviewTopic: 'Prepare answer: "Why Army Officer after B.Tech ECE?"',
    doneInterview: false,
    gdTopic: 'Agnipath Scheme: Youthful profile vs combat readiness',
    doneGd: false
  },
  fitness: {
    workoutCompleted: true,
    workoutTitle: 'Chest + Triceps (Push Heavy)',
    exercisesDone: 5,
    cardioDoneMin: 20,
    stepsCount: 8400,
    waterLiters: 3.5,
    waterTarget: 4.0,
    sleepHours: 7.2,
    nutrition: {
      calories: 2150,
      caloriesTarget: 2300,
      proteinG: 135,
      proteinTarget: 140,
      carbsG: 220,
      fatsG: 62,
      fiberG: 34
    }
  },
  it: {
    javaTopic: 'Java Collections Framework — HashMap & HashSet internal working',
    doneJava: false,
    sqlTopic: 'GROUP BY and HAVING practice with employee aggregations',
    doneSql: true,
    codingProblemsSolved: 2,
    codingTarget: 3,
    interviewQuestionTask: 'Review HashMap equals() and hashcode() contract',
    doneInterview: false
  },
  govtJobs: {
    notificationChecked: 'UPSC CDS upcoming release & APPSC Group-1 syllabus watch',
    applicationsPending: 0
  },
  personalDev: {
    englishVocabWords: ['Equanimity', 'Pragmatic', 'Indomitable', 'Tenacity', 'Ubiquitous'],
    readingMin: 30,
    speakingPracticeMin: 15,
    done: true
  }
};

const defaultScheduleTemplate = {
  wakeTime: '06:00',
  sleepTime: '23:00',
  focusBlocks: [
    { time: '06:00 - 08:30', label: 'Physical Fitness & 1600m Run' },
    { time: '09:30 - 13:00', label: 'UPSC Core GS & Revision' },
    { time: '14:30 - 17:00', label: 'B.Tech ECE & IT Java Stack' },
    { time: '18:00 - 20:30', label: 'SSB Psychology & Current Affairs' },
    { time: '21:30 - 22:30', label: 'Night Evaluation & Planning' }
  ]
};

const defaultNotifications = {
  morningBriefing: true,
  studyReminders: true,
  streakAlerts: true,
  nightDebrief: true
};

const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
  console.log('[GARUDA DB] Seeding initial default cadet profile...');
  const manojId = 'usr_manoj_2027';
  const hashed = bcrypt.hashSync('cadet2027', 10);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO users (id, name, email, password_hash, target_goal, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    manojId,
    'Manoj',
    'manoj@garuda.in',
    hashed,
    'Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services',
    now
  );

  db.prepare(`
    INSERT INTO preferences (user_id, theme, notification_settings, daily_schedule)
    VALUES (?, ?, ?, ?)
  `).run(
    manojId,
    'dark',
    JSON.stringify(defaultNotifications),
    JSON.stringify(defaultScheduleTemplate)
  );

  db.prepare(`
    INSERT INTO user_data (user_id, mission_data, streaks, completion_percentage, reports, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    manojId,
    JSON.stringify(defaultMissionsTemplate),
    8,
    65,
    JSON.stringify([]),
    now
  );

  console.log('[GARUDA DB] Default user seeded: manoj@garuda.in (Password: cadet2027)');
}

// 3. JWT Utility Functions (RFC 7519 HMAC-SHA256)
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function signJwt(payload, secret, expiresInSeconds = 7 * 86400) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${data}.${signature}`;
}

function verifyJwt(token, secret) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, signature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (
      signature.length !== expectedSig.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
    ) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

function getAuthToken(req) {
  // 1. Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  // 2. Cookie: garuda_jwt=<token>
  const cookieHeader = req.headers['cookie'];
  if (cookieHeader) {
    const match = cookieHeader.match(/garuda_jwt=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

function authenticateRequest(req) {
  const token = getAuthToken(req);
  if (!token) return null;
  return verifyJwt(token, JWT_SECRET);
}

// 4. Request Body Helper
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 5. Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  const sendJson = (statusCode, data, setCookie = null) => {
    const jsonStr = JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(jsonStr)
    };
    if (setCookie) {
      headers['Set-Cookie'] = setCookie;
    }
    res.writeHead(statusCode, headers);
    res.end(jsonStr);
  };

  try {
    // ==========================================
    // REST API ROUTES
    // ==========================================
    if (pathname.startsWith('/api/')) {
      // 1. POST /api/auth/signup
      if (pathname === '/api/auth/signup' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { name, email, password, target_goal } = body;

        if (!name || !email || !password) {
          return sendJson(400, { success: false, error: 'Name, email, and password are required.' });
        }

        const cleanEmail = email.toLowerCase().trim();
        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
        if (existing) {
          return sendJson(409, { success: false, error: 'An account with this email already exists.' });
        }

        const userId = 'usr_' + Date.now().toString(36) + '_' + crypto.randomBytes(3).toString('hex');
        const passwordHash = bcrypt.hashSync(password, 10);
        const goal = target_goal && target_goal.trim() ? target_goal.trim() : 'Indian Army Officer & UPSC';
        const createdAt = new Date().toISOString();

        // Insert into users
        db.prepare(`
          INSERT INTO users (id, name, email, password_hash, target_goal, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(userId, name.trim(), cleanEmail, passwordHash, goal, createdAt);

        // Insert default preferences
        db.prepare(`
          INSERT INTO preferences (user_id, theme, notification_settings, daily_schedule)
          VALUES (?, ?, ?, ?)
        `).run(userId, 'dark', JSON.stringify(defaultNotifications), JSON.stringify(defaultScheduleTemplate));

        // Insert personalized mission data
        const initialMission = JSON.parse(JSON.stringify(defaultMissionsTemplate));
        initialMission.date = createdAt.split('T')[0];
        db.prepare(`
          INSERT INTO user_data (user_id, mission_data, streaks, completion_percentage, reports, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(userId, JSON.stringify(initialMission), 1, 0, JSON.stringify([]), createdAt);

        const token = signJwt({ id: userId, email: cleanEmail, name: name.trim(), target_goal: goal }, JWT_SECRET);
        const cookie = `garuda_jwt=${encodeURIComponent(token)}; Path=/; Max-Age=604800; SameSite=Lax`;

        return sendJson(201, {
          success: true,
          token,
          user: { id: userId, name: name.trim(), email: cleanEmail, target_goal: goal }
        }, cookie);
      }

      // 2. POST /api/auth/login
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const { email, password } = body;

        if (!email || !password) {
          return sendJson(400, { success: false, error: 'Email and password are required.' });
        }

        const cleanEmail = email.toLowerCase().trim();
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
          return sendJson(401, { success: false, error: 'Invalid email or password.' });
        }

        const token = signJwt({
          id: user.id,
          email: user.email,
          name: user.name,
          target_goal: user.target_goal
        }, JWT_SECRET);

        const cookie = `garuda_jwt=${encodeURIComponent(token)}; Path=/; Max-Age=604800; SameSite=Lax`;

        return sendJson(200, {
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            target_goal: user.target_goal
          }
        }, cookie);
      }

      // 3. POST /api/auth/logout
      if (pathname === '/api/auth/logout' && req.method === 'POST') {
        const cookie = 'garuda_jwt=; Path=/; Max-Age=0; SameSite=Lax';
        return sendJson(200, { success: true, message: 'Logged out successfully.' }, cookie);
      }

      // 4. GET /api/auth/me (Check token session)
      if (pathname === '/api/auth/me' && req.method === 'GET') {
        const auth = authenticateRequest(req);
        if (!auth) {
          return sendJson(401, { success: false, error: 'Unauthorized or token expired.' });
        }

        const user = db.prepare('SELECT id, name, email, target_goal, created_at FROM users WHERE id = ?').get(auth.id);
        if (!user) {
          return sendJson(404, { success: false, error: 'User not found.' });
        }

        const pref = db.prepare('SELECT theme, notification_settings, daily_schedule FROM preferences WHERE user_id = ?').get(auth.id);

        return sendJson(200, {
          success: true,
          user,
          preferences: pref ? {
            theme: pref.theme,
            notification_settings: JSON.parse(pref.notification_settings || '{}'),
            daily_schedule: JSON.parse(pref.daily_schedule || '{}')
          } : null
        });
      }

      // 5. GET /api/dashboard (Per-user mission data, streaks, completion %, priorities)
      if (pathname === '/api/dashboard' && req.method === 'GET') {
        const auth = authenticateRequest(req);
        if (!auth) {
          return sendJson(401, { success: false, error: 'Unauthorized. Please log in.' });
        }

        const user = db.prepare('SELECT id, name, email, target_goal FROM users WHERE id = ?').get(auth.id);
        const userData = db.prepare('SELECT mission_data, streaks, completion_percentage, reports, updated_at FROM user_data WHERE user_id = ?').get(auth.id);
        const pref = db.prepare('SELECT theme, notification_settings, daily_schedule FROM preferences WHERE user_id = ?').get(auth.id);

        return sendJson(200, {
          success: true,
          user,
          missionData: userData ? JSON.parse(userData.mission_data) : defaultMissionsTemplate,
          streaks: userData ? userData.streaks : 1,
          completionPercentage: userData ? userData.completion_percentage : 0,
          reports: userData ? JSON.parse(userData.reports || '[]') : [],
          preferences: pref ? {
            theme: pref.theme,
            notification_settings: JSON.parse(pref.notification_settings || '{}'),
            daily_schedule: JSON.parse(pref.daily_schedule || '{}')
          } : null
        });
      }

      // 6. POST or PUT /api/dashboard (Save per-user mission data & completion)
      if (pathname === '/api/dashboard' && (req.method === 'POST' || req.method === 'PUT')) {
        const auth = authenticateRequest(req);
        if (!auth) {
          return sendJson(401, { success: false, error: 'Unauthorized.' });
        }

        const body = await readJsonBody(req);
        const { missionData, streaks, completionPercentage, reports } = body;
        const now = new Date().toISOString();

        db.prepare(`
          INSERT INTO user_data (user_id, mission_data, streaks, completion_percentage, reports, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            mission_data = excluded.mission_data,
            streaks = excluded.streaks,
            completion_percentage = excluded.completion_percentage,
            reports = excluded.reports,
            updated_at = excluded.updated_at
        `).run(
          auth.id,
          JSON.stringify(missionData || defaultMissionsTemplate),
          typeof streaks === 'number' ? streaks : 1,
          typeof completionPercentage === 'number' ? completionPercentage : 0,
          JSON.stringify(reports || []),
          now
        );

        return sendJson(200, { success: true, message: 'Dashboard updated successfully in database.', updated_at: now });
      }

      // 7. GET /api/preferences
      if (pathname === '/api/preferences' && req.method === 'GET') {
        const auth = authenticateRequest(req);
        if (!auth) {
          return sendJson(401, { success: false, error: 'Unauthorized.' });
        }

        const user = db.prepare('SELECT target_goal FROM users WHERE id = ?').get(auth.id);
        const pref = db.prepare('SELECT theme, notification_settings, daily_schedule FROM preferences WHERE user_id = ?').get(auth.id);

        return sendJson(200, {
          success: true,
          target_goal: user ? user.target_goal : '',
          theme: pref ? pref.theme : 'dark',
          notification_settings: pref ? JSON.parse(pref.notification_settings || '{}') : defaultNotifications,
          daily_schedule: pref ? JSON.parse(pref.daily_schedule || '{}') : defaultScheduleTemplate
        });
      }

      // 8. PUT /api/preferences (Update user preferences & target goal)
      if (pathname === '/api/preferences' && (req.method === 'PUT' || req.method === 'POST')) {
        const auth = authenticateRequest(req);
        if (!auth) {
          return sendJson(401, { success: false, error: 'Unauthorized.' });
        }

        const body = await readJsonBody(req);
        const { theme, notification_settings, daily_schedule, target_goal } = body;

        // Update target_goal in users table if provided
        if (target_goal !== undefined) {
          db.prepare('UPDATE users SET target_goal = ? WHERE id = ?').run(target_goal.trim(), auth.id);
        }

        // Update preferences table
        const currentPref = db.prepare('SELECT * FROM preferences WHERE user_id = ?').get(auth.id);
        const updatedTheme = theme || (currentPref ? currentPref.theme : 'dark');
        const updatedNotifs = notification_settings ? JSON.stringify(notification_settings) : (currentPref ? currentPref.notification_settings : JSON.stringify(defaultNotifications));
        const updatedSchedule = daily_schedule ? JSON.stringify(daily_schedule) : (currentPref ? currentPref.daily_schedule : JSON.stringify(defaultScheduleTemplate));

        db.prepare(`
          INSERT INTO preferences (user_id, theme, notification_settings, daily_schedule)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            theme = excluded.theme,
            notification_settings = excluded.notification_settings,
            daily_schedule = excluded.daily_schedule
        `).run(auth.id, updatedTheme, updatedNotifs, updatedSchedule);

        return sendJson(200, {
          success: true,
          message: 'Preferences updated successfully.',
          preferences: {
            theme: updatedTheme,
            notification_settings: JSON.parse(updatedNotifs),
            daily_schedule: JSON.parse(updatedSchedule),
            target_goal: target_goal
          }
        });
      }

      // Legacy fallback compatibility for sync
      if (pathname === '/api/data/sync' && req.method === 'POST') {
        const auth = authenticateRequest(req);
        const body = await readJsonBody(req);
        const targetUserId = auth ? auth.id : 'usr_manoj_2027';
        if (body.payload) {
          db.prepare(`
            INSERT INTO user_data (user_id, mission_data, streaks, completion_percentage, reports, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET
              mission_data = excluded.mission_data,
              updated_at = excluded.updated_at
          `).run(
            targetUserId,
            JSON.stringify(body.payload.todayMission || defaultMissionsTemplate),
            body.payload.profile?.streakDays || 1,
            body.payload.todayMission?.completionPercentage || 0,
            JSON.stringify(body.payload.dailyReports || []),
            new Date().toISOString()
          );
        }
        return sendJson(200, { success: true, timestamp: new Date().toISOString() });
      }

      return sendJson(404, { success: false, error: 'API endpoint not found.' });
    }

    // ==========================================
    // STATIC FILE SERVING
    // ==========================================
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    filePath = path.normalize(filePath);

    // Security check: ensure path is within __dirname
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    // If file doesn't exist, check fallback to index.html for SPA routing
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const stream = fs.createReadStream(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    stream.pipe(res);
  } catch (err) {
    console.error('[GARUDA SERVER ERROR]', err);
    sendJson(500, { success: false, error: 'Internal server error: ' + err.message });
  }
});

// Start Server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[GARUDA OS] Operational HTTP Server Running on port ${PORT}!`);
  console.log(`[GARUDA OS] Localhost: http://localhost:${PORT}/`);
  console.log(`[GARUDA OS] Database:  ${DB_FILE}`);
  console.log(`[GARUDA OS] JWT Secret initialized from environment.`);
});
