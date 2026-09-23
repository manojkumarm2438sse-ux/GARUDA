// ==========================================================================
// GARUDA OS - Authentication Views (Login & Signup) & Preferences Page
// Matches existing tactical military & gold design tokens exactly
// ==========================================================================

import { authManager } from './auth.js';
import { store } from './store.js';

/**
 * 1. LOGIN PAGE VIEW
 */
export function renderLoginView(container, onLoginSuccess) {
  container.innerHTML = `
    <div style="max-width: 480px; margin: 2rem auto; padding: 0 1rem;">
      <!-- Brand Crest & Header -->
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; border-radius: 50%; background: rgba(245, 158, 11, 0.1); border: 2px solid var(--accent-gold); margin-bottom: 0.75rem; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);">
          <img src="./assets/icons/garuda_icon.jpg" alt="GARUDA" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.25rem;">
          GARUDA <span style="font-size: 1.4rem;">🇮🇳</span>
        </h1>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0;">
          Officer Preparation Coach & Personal Operating System
        </p>
      </div>

      <!-- Main Login Card -->
      <div class="card card-gold" style="padding: 1.75rem; box-shadow: var(--shadow-xl); border: 1px solid rgba(245, 158, 11, 0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div>
            <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 0.15rem;">
              CADET SIGN IN
            </h2>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
              JWT Authenticated Access
            </span>
          </div>
          <span class="badge badge-strong">SECURE</span>
        </div>

        <!-- Install App to Home Screen Banner -->
        <div id="btn-login-install-app" style="margin-bottom: 1rem; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 0.65rem 0.85rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.3rem;">📲</span>
            <div>
              <div style="font-size: 0.82rem; font-weight: 700; color: #38BDF8;">INSTALL APP TO HOME SCREEN</div>
              <div style="font-size: 0.7rem; color: var(--text-secondary);">One-tap offline PWA for Android & iPhone</div>
            </div>
          </div>
          <span class="btn btn-outline btn-sm" style="font-size: 0.72rem; padding: 0.2rem 0.55rem; border-color: #38BDF8; color: #38BDF8;">Install →</span>
        </div>

        <!-- Quick 1-Click Demo Login Box -->
        <div class="card" style="background: rgba(245, 158, 11, 0.06); border: 1px dashed var(--accent-gold); padding: 0.85rem; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold);">⚡ INSTANT DEMO LOGIN</div>
            <div style="font-size: 0.72rem; color: var(--text-secondary);">Cadet Manoj (manoj@garuda.in)</div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-quick-login" type="button" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
            Instant Fill & Sign In
          </button>
        </div>

        <!-- Login Form -->
        <form id="form-login" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem;">
              CADET EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="cadet@garuda.in" 
              value="manoj@garuda.in" 
              required 
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem;">
              PASSWORD
            </label>
            <input 
              type="password" 
              id="login-password" 
              placeholder="Enter your password" 
              value="cadet2027" 
              required 
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <!-- Alert / Error message -->
          <div id="login-error" style="display: none; padding: 0.65rem 0.85rem; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #FCA5A5; font-size: 0.82rem;"></div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            id="btn-login-submit" 
            style="width: 100%; padding: 0.85rem; font-size: 0.95rem; font-weight: 800; margin-top: 0.25rem; letter-spacing: 0.03em;"
          >
            Authenticate & Access Terminal →
          </button>
        </form>

        <!-- Switch to Signup Link -->
        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          New Cadet? 
          <a href="#signup" style="color: var(--accent-gold); font-weight: 700; text-decoration: none; margin-left: 0.25rem;">
            Create Commission Profile (Signup) →
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach Quick Login
  const quickBtn = container.querySelector('#btn-quick-login');
  if (quickBtn) {
    quickBtn.addEventListener('click', async () => {
      container.querySelector('#login-email').value = 'manoj@garuda.in';
      container.querySelector('#login-password').value = 'cadet2027';
      quickBtn.disabled = true;
      quickBtn.textContent = 'Authenticating...';
      const res = await authManager.login('manoj@garuda.in', 'cadet2027');
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user);
      } else {
        quickBtn.disabled = false;
        quickBtn.textContent = 'Instant Fill & Sign In';
        const errBox = container.querySelector('#login-error');
        errBox.textContent = res.error || 'Authentication failed.';
        errBox.style.display = 'block';
      }
    });
  }

  // Attach Install App Trigger
  container.querySelector('#btn-login-install-app')?.addEventListener('click', () => {
    document.getElementById('btn-pwa-install')?.click();
  });

  // Handle Form Submit
  const form = container.querySelector('#form-login');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#login-email').value.trim();
      const password = container.querySelector('#login-password').value;
      const errBox = container.querySelector('#login-error');
      const submitBtn = container.querySelector('#btn-login-submit');

      errBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying Credentials...';

      const res = await authManager.login(email, password);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user);
      } else {
        errBox.textContent = res.error || 'Invalid email or password.';
        errBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Authenticate & Access Terminal →';
      }
    });
  }
}

/**
 * 2. SIGNUP PAGE VIEW
 */
export function renderSignupView(container, onSignupSuccess) {
  container.innerHTML = `
    <div style="max-width: 520px; margin: 2rem auto; padding: 0 1rem;">
      <!-- Brand Crest & Header -->
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; border-radius: 50%; background: rgba(245, 158, 11, 0.1); border: 2px solid var(--accent-gold); margin-bottom: 0.75rem; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);">
          <img src="./assets/icons/garuda_icon.jpg" alt="GARUDA" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
        </div>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.25rem;">
          GARUDA <span style="font-size: 1.4rem;">🇮🇳</span>
        </h1>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0;">
          Cadet Commissioning & Operating Database Setup
        </p>
      </div>

      <!-- Main Signup Card -->
      <div class="card card-gold" style="padding: 1.75rem; box-shadow: var(--shadow-xl); border: 1px solid rgba(245, 158, 11, 0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div>
            <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 0.15rem;">
              CADET REGISTRATION
            </h2>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
              Isolated SQLite Storage Linked to User ID
            </span>
          </div>
          <span class="badge badge-strong">NEW CADET</span>
        </div>

        <!-- Signup Form -->
        <form id="form-signup" style="display: flex; flex-direction: column; gap: 0.9rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.3rem;">
              CADET FULL NAME
            </label>
            <input 
              type="text" 
              id="signup-name" 
              placeholder="e.g. Vikram Batra" 
              required 
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.3rem;">
              OFFICIAL EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              id="signup-email" 
              placeholder="cadet@domain.com" 
              required 
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.3rem;">
              PASSWORD (BCRYPT ENCRYPTED)
            </label>
            <input 
              type="password" 
              id="signup-password" 
              placeholder="At least 6 characters" 
              required 
              minlength="6"
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.3rem;">
              TARGET GOAL / MASTER AMBITION
            </label>
            <input 
              type="text" 
              id="signup-goal" 
              placeholder="e.g. Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services" 
              value="Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services"
              required 
              style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.92rem;"
            >
          </div>

          <!-- Alert / Error message -->
          <div id="signup-error" style="display: none; padding: 0.65rem 0.85rem; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #FCA5A5; font-size: 0.82rem;"></div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            id="btn-signup-submit" 
            style="width: 100%; padding: 0.85rem; font-size: 0.95rem; font-weight: 800; margin-top: 0.4rem; letter-spacing: 0.03em;"
          >
            Initialize Cadet Database & Enter →
          </button>
        </form>

        <!-- Switch to Login Link -->
        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          Already have an account? 
          <a href="#login" style="color: var(--accent-gold); font-weight: 700; text-decoration: none; margin-left: 0.25rem;">
            Sign In to Existing Profile →
          </a>
        </div>
      </div>
    </div>
  `;

  // Handle Form Submit
  const form = container.querySelector('#form-signup');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = container.querySelector('#signup-name').value.trim();
      const email = container.querySelector('#signup-email').value.trim();
      const password = container.querySelector('#signup-password').value;
      const target_goal = container.querySelector('#signup-goal').value.trim();
      const errBox = container.querySelector('#signup-error');
      const submitBtn = container.querySelector('#btn-signup-submit');

      errBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account & Initializing Database...';

      const res = await authManager.signup({ name, email, password, target_goal });
      if (res.success) {
        if (onSignupSuccess) onSignupSuccess(res.user);
      } else {
        errBox.textContent = res.error || 'Signup failed. Please try again.';
        errBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Initialize Cadet Database & Enter →';
      }
    });
  }
}

/**
 * 3. PREFERENCES VIEW (Page & Modal Handler)
 * Fully compliant with requirements:
 * - Theme (dark/light)
 * - Daily schedule (wake/sleep time, focus blocks)
 * - Notification on/off toggles
 * - Target goal / mission text
 * - Preserves existing tactical aesthetics exactly
 */
export function renderPreferencesView(container, onSaveCallback) {
  const user = authManager.getUser() || { name: 'Cadet', target_goal: 'Indian Army Officer & UPSC' };
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  // Get current preferences from memory or defaults
  const userPref = authManager.cachedPreferences || {
    theme: currentTheme,
    notification_settings: {
      morningBriefing: true,
      studyReminders: true,
      streakAlerts: true,
      nightDebrief: true
    },
    daily_schedule: {
      wakeTime: '06:00',
      sleepTime: '23:00',
      focusBlocks: [
        { time: '06:00 - 08:30', label: 'Physical Fitness & 1600m Run' },
        { time: '09:30 - 13:00', label: 'UPSC Core GS & Revision' },
        { time: '14:30 - 17:00', label: 'B.Tech ECE & IT Java Stack' },
        { time: '18:00 - 20:30', label: 'SSB Psychology & Current Affairs' },
        { time: '21:30 - 22:30', label: 'Night Evaluation & Planning' }
      ]
    }
  };

  const notifs = userPref.notification_settings || {};
  const sched = userPref.daily_schedule || {};
  const focusBlocks = sched.focusBlocks || [];

  container.innerHTML = `
    <div style="max-width: 760px; margin: 1rem auto; padding: 0 1rem 3rem 1rem;">
      <!-- Title Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.6rem;">⚙️</span>
            <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              CADET PREFERENCES & OPERATING CONFIG
            </h1>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.25rem 0 0 0;">
            Persisted in SQLite database for <strong>${user.name}</strong> (${user.email || 'Active Account'})
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-pref-back-home">
          ← Back to Mission
        </button>
      </div>

      <!-- Success Notification Banner -->
      <div id="pref-success-alert" style="display: none; padding: 0.85rem 1rem; margin-bottom: 1.25rem; background: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: var(--radius-md); color: #86EFAC; font-weight: 600; font-size: 0.9rem;">
        ✅ Preferences and Daily Schedule successfully saved to database!
      </div>

      <form id="form-preferences">
        <!-- 1. Master Ambition & Target Goal -->
        <div class="card card-gold" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-gold); margin: 0;">
              🎯 TARGET GOAL / MASTER AMBITION
            </h3>
            <span class="badge badge-strong">CORE DRIVER</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            This ambition is projected on your top header banner and grounds your daily orders.
          </p>
          <input 
            type="text" 
            id="pref-target-goal" 
            value="${user.target_goal || 'Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services'}" 
            required 
            style="width: 100%; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; font-weight: 600;"
          >
        </div>

        <!-- 2. Display Theme -->
        <div class="card" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              🌓 DISPLAY THEME
            </h3>
            <span class="badge badge-learning">VISUAL MODE</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Switch between tactical stealth night mode and daylight operational visibility.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <label style="display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface); cursor: pointer;">
              <input type="radio" name="pref-theme" value="dark" ${currentTheme === 'dark' ? 'checked' : ''} style="accent-color: var(--accent-gold);">
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;">🌑 Tactical Dark Mode</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">OLED Black, Low Eye Strain</div>
              </div>
            </label>

            <label style="display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface); cursor: pointer;">
              <input type="radio" name="pref-theme" value="light" ${currentTheme === 'light' ? 'checked' : ''} style="accent-color: var(--accent-gold);">
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;">☀️ Daylight Operations</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">High Contrast for Outdoor Prep</div>
              </div>
            </label>
          </div>
        </div>

        <!-- 3. Daily Schedule & Focus Blocks -->
        <div class="card" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              ⏰ DAILY SCHEDULE TIMETABLE
            </h3>
            <span class="badge badge-strong">DISCIPLINE</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Defines your operational rhythm. All daily timeline blocks calibrate to these hours.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">
                🌅 WAKE-UP TIME (REVEILLE)
              </label>
              <input 
                type="time" 
                id="pref-wake-time" 
                value="${sched.wakeTime || '06:00'}" 
                style="width: 100%; padding: 0.65rem 0.75rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem;"
              >
            </div>

            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">
                🌙 SLEEP TIME (LIGHTS OUT)
              </label>
              <input 
                type="time" 
                id="pref-sleep-time" 
                value="${sched.sleepTime || '23:00'}" 
                style="width: 100%; padding: 0.65rem 0.75rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem;"
              >
            </div>
          </div>

          <label style="display: block; font-size: 0.78rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.5rem;">
            ⚡ ACTIVE FOCUS BLOCKS
          </label>
          <div id="pref-focus-blocks-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${focusBlocks.map((b, idx) => `
              <div class="card" style="margin-bottom: 0; padding: 0.65rem 0.85rem; background: var(--bg-surface); display: flex; align-items: center; gap: 0.65rem;">
                <span class="meta-chip" style="font-weight: 700; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;">#${idx + 1}</span>
                <input 
                  type="text" 
                  class="pref-block-time" 
                  value="${b.time}" 
                  placeholder="e.g. 09:30 - 13:00" 
                  style="width: 140px; padding: 0.4rem 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.82rem;"
                >
                <input 
                  type="text" 
                  class="pref-block-label" 
                  value="${b.label}" 
                  placeholder="Focus Block Label" 
                  style="flex: 1; padding: 0.4rem 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.82rem;"
                >
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Tactical Notification Toggles -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              🔔 NOTIFICATION & ALERT PREFERENCES
            </h3>
            <span class="badge badge-strong">SYSTEM ALERTS</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Configure AI Coach reminders, alarm briefings, and discipline warnings.
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            <label style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); cursor: pointer;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">🌅 Morning 06:00 Operational Briefing</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Daily Battle Orders & Priority Directives</div>
              </div>
              <input type="checkbox" id="pref-notif-morning" ${notifs.morningBriefing !== false ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-gold);">
            </label>

            <label style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); cursor: pointer;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">📚 Study Block & Focus Reminders</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Prompts at the start of each study block</div>
              </div>
              <input type="checkbox" id="pref-notif-study" ${notifs.studyReminders !== false ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-gold);">
            </label>

            <label style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); cursor: pointer;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">🔥 Streak Protection & Discipline Alerts</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Warns if daily priorities remain pending past 20:00</div>
              </div>
              <input type="checkbox" id="pref-notif-streak" ${notifs.streakAlerts !== false ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-gold);">
            </label>

            <label style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); cursor: pointer;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">🌙 22:30 Night Debrief & Evaluation</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Prompts evening evaluation and next-day planning</div>
              </div>
              <input type="checkbox" id="pref-notif-night" ${notifs.nightDebrief !== false ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-gold);">
            </label>
          </div>
        </div>

        <!-- Submit & Save Button -->
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" id="btn-pref-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary" id="btn-pref-save" style="padding: 0.75rem 1.5rem; font-weight: 800;">
            💾 Save Preferences to Database
          </button>
        </div>
      </form>
    </div>
  `;

  // Back button
  container.querySelector('#btn-pref-back-home')?.addEventListener('click', () => {
    window.location.hash = '#home';
  });
  container.querySelector('#btn-pref-cancel')?.addEventListener('click', () => {
    window.location.hash = '#home';
  });

  // Handle Preferences Save
  const form = container.querySelector('#form-preferences');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = container.querySelector('#btn-pref-save');
      const alertBox = container.querySelector('#pref-success-alert');

      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving to Database...';

      // Read form values
      const targetGoal = container.querySelector('#pref-target-goal').value.trim();
      const selectedTheme = container.querySelector('input[name="pref-theme"]:checked')?.value || 'dark';
      const wakeTime = container.querySelector('#pref-wake-time').value;
      const sleepTime = container.querySelector('#pref-sleep-time').value;

      // Focus blocks
      const blockTimes = container.querySelectorAll('.pref-block-time');
      const blockLabels = container.querySelectorAll('.pref-block-label');
      const blocks = [];
      blockTimes.forEach((el, i) => {
        if (el.value.trim() || blockLabels[i]?.value.trim()) {
          blocks.push({
            time: el.value.trim(),
            label: blockLabels[i]?.value.trim() || 'Focus Session'
          });
        }
      });

      const updatedNotifs = {
        morningBriefing: container.querySelector('#pref-notif-morning').checked,
        studyReminders: container.querySelector('#pref-notif-study').checked,
        streakAlerts: container.querySelector('#pref-notif-streak').checked,
        nightDebrief: container.querySelector('#pref-notif-night').checked
      };

      const updatedSchedule = {
        wakeTime,
        sleepTime,
        focusBlocks: blocks
      };

      // Call API
      const res = await authManager.updatePreferences({
        theme: selectedTheme,
        target_goal: targetGoal,
        notification_settings: updatedNotifs,
        daily_schedule: updatedSchedule
      });

      saveBtn.disabled = false;
      saveBtn.textContent = '💾 Save Preferences to Database';

      if (res.success) {
        // Apply theme immediately
        document.documentElement.setAttribute('data-theme', selectedTheme);
        store.updateProfile({ theme: selectedTheme, targetGoal });

        // Update target text on top navbar
        const headerMission = document.querySelector('.mission-text');
        if (headerMission) {
          headerMission.textContent = `TARGET: ${targetGoal.toUpperCase()}`;
        }

        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (onSaveCallback) onSaveCallback(res.preferences);
      } else {
        alert('Failed to save preferences: ' + (res.error || 'Server error'));
      }
    });
  }
}
