// ==========================================================================
// GARUDA OS - Authentication Manager & Session State (RFC 7519 JWT & Client DB)
// Supports SQLite Backend (Node.js) & Hybrid Fallback (GitHub Pages)
// ==========================================================================

const TOKEN_KEY = 'garuda_jwt_token';
const USER_KEY = 'garuda_jwt_user';

class AuthManager {
  constructor() {
    this.token = this.loadToken();
    this.user = this.loadUser();
    this.cachedPreferences = this.loadCachedPreferences();
  }

  loadToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  loadUser() {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  loadCachedPreferences() {
    try {
      const u = this.loadUser();
      if (u && u.id) {
        const saved = localStorage.getItem('garuda_user_pref_' + u.id);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {}
    return null;
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return Boolean(this.token && this.user);
  }

  setSession(token, user) {
    this.token = token;
    this.user = user;
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('garuda_active_user', JSON.stringify({ ...user, isLoggedIn: true }));
    } catch (e) {
      console.warn('[GARUDA AUTH] Storage error:', e);
    }
  }

  clearSession() {
    this.token = null;
    this.user = null;
    this.cachedPreferences = null;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem('garuda_active_user');
    } catch (e) {
      console.warn('[GARUDA AUTH] Clear session error:', e);
    }
  }

  // 1. SIGNUP (Server API with GitHub Pages Client DB Fallback)
  async signup(data) {
    // 1. Try server REST API first
    try {
      const res = await fetch('./api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          this.setSession(result.token, result.user);
          return { success: true, user: result.user };
        }
      } else if (res.status === 409) {
        const result = await res.json();
        return { success: false, error: result.error || 'An account with this email already exists.' };
      }
    } catch (err) {
      // Server offline / GitHub Pages static mode
    }

    // 2. Client Database Fallback for GitHub Pages
    try {
      const localUsers = JSON.parse(localStorage.getItem('garuda_local_users') || '[]');
      const cleanEmail = data.email.toLowerCase().trim();

      if (localUsers.some(u => u.email === cleanEmail) || cleanEmail === 'manoj@garuda.in') {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const userId = 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
      const newUser = {
        id: userId,
        name: data.name.trim(),
        email: cleanEmail,
        target_goal: data.target_goal && data.target_goal.trim() ? data.target_goal.trim() : 'Indian Army Officer & UPSC',
        password: data.password
      };

      localUsers.push(newUser);
      localStorage.setItem('garuda_local_users', JSON.stringify(localUsers));

      const token = 'garuda_jwt_' + userId + '_' + Date.now();
      this.setSession(token, newUser);
      return { success: true, user: newUser };
    } catch (e) {
      return { success: false, error: 'Registration error: ' + e.message };
    }
  }

  // 2. LOGIN (Server API with GitHub Pages Client DB Fallback)
  async login(email, password) {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Try server REST API first
    try {
      const res = await fetch('./api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          this.setSession(result.token, result.user);
          return { success: true, user: result.user };
        }
      } else if (res.status === 401) {
        const result = await res.json();
        return { success: false, error: result.error || 'Invalid email or password' };
      }
    } catch (err) {
      // Server offline / GitHub Pages static mode
    }

    // 2. Client Database Fallback for GitHub Pages
    // Default Cadet Manoj account
    if (cleanEmail === 'manoj@garuda.in' && (password === 'cadet2027' || password === 'admin' || password === '1234')) {
      const user = {
        id: 'usr_manoj_2027',
        name: 'Manoj',
        email: 'manoj@garuda.in',
        target_goal: 'Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services'
      };
      this.setSession('garuda_jwt_manoj', user);
      return { success: true, user };
    }

    // Check local registered users
    try {
      const localUsers = JSON.parse(localStorage.getItem('garuda_local_users') || '[]');
      const matched = localUsers.find(u => u.email === cleanEmail && u.password === password);
      if (matched) {
        const user = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          target_goal: matched.target_goal
        };
        this.setSession('garuda_jwt_' + matched.id, user);
        return { success: true, user };
      }
    } catch (e) {}

    return { success: false, error: 'Invalid email or password.' };
  }

  // 3. LOGOUT
  async logout() {
    try {
      await fetch('./api/auth/logout', { method: 'POST' });
    } catch (e) {}
    this.clearSession();
    return { success: true };
  }

  // 4. VERIFY ACTIVE JWT SESSION
  async checkAuth() {
    if (!this.token) return null;
    try {
      const res = await fetch('./api/auth/me', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          this.user = data.user;
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          if (data.preferences) this.cachedPreferences = data.preferences;
          return data;
        }
      }
    } catch (e) {}
    // If static GitHub Pages or offline, trust valid local session
    return this.user ? { success: true, user: this.user, preferences: this.cachedPreferences } : null;
  }

  // 5. FETCH PER-USER DASHBOARD DATA
  async fetchDashboard() {
    if (!this.token || !this.user) return null;

    // 1. Try server REST API first
    try {
      const res = await fetch('./api/dashboard', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.preferences) this.cachedPreferences = data.preferences;
          return data;
        }
      }
    } catch (err) {}

    // 2. Client storage fallback
    try {
      const saved = localStorage.getItem('garuda_user_dash_' + this.user.id);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.preferences) this.cachedPreferences = parsed.preferences;
        return parsed;
      }
    } catch (e) {}

    return {
      success: true,
      user: this.user,
      streaks: 8,
      completionPercentage: 65,
      preferences: this.cachedPreferences
    };
  }

  // 6. SAVE PER-USER DASHBOARD DATA
  async saveDashboard(payload) {
    if (!this.token || !this.user) return false;

    // Save to local cache first
    try {
      localStorage.setItem('garuda_user_dash_' + this.user.id, JSON.stringify({
        success: true,
        user: this.user,
        missionData: payload.missionData,
        streaks: payload.streaks,
        completionPercentage: payload.completionPercentage,
        reports: payload.reports,
        preferences: this.cachedPreferences
      }));
    } catch (e) {}

    // Try server sync
    try {
      await fetch('./api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {}

    return true;
  }

  // 7. GET PREFERENCES
  async getPreferences() {
    if (!this.token) return null;
    try {
      const res = await fetch('./api/preferences', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          this.cachedPreferences = data;
          return data;
        }
      }
    } catch (e) {}

    return this.cachedPreferences;
  }

  // 8. UPDATE PREFERENCES
  async updatePreferences(prefData) {
    if (!this.token || !this.user) return { success: false, error: 'Not authenticated' };

    this.cachedPreferences = { ...this.cachedPreferences, ...prefData };
    if (prefData.target_goal && this.user) {
      this.user.target_goal = prefData.target_goal;
      localStorage.setItem(USER_KEY, JSON.stringify(this.user));
    }

    try {
      localStorage.setItem('garuda_user_pref_' + this.user.id, JSON.stringify(this.cachedPreferences));
    } catch (e) {}

    // Try server sync
    try {
      await fetch('./api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(prefData)
      });
    } catch (err) {}

    return { success: true, preferences: this.cachedPreferences };
  }
}

export const authManager = new AuthManager();

/**
 * Top Navbar Auth Area Renderer:
 * Displays user avatar badge, cadet name, and dedicated LOGOUT button!
 */
export function renderAuthHeaderSection(onLogout) {
  const container = document.getElementById('header-auth-badge');
  if (!container) return;

  const isAuth = authManager.isAuthenticated();
  const user = authManager.getUser();

  if (isAuth && user) {
    const initial = user.name ? user.name.charAt(0).toUpperCase() : 'C';
    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <div class="user-profile-badge" id="btn-navbar-profile" title="Officer Cadet: ${user.name} (${user.email || ''})" style="cursor: pointer;">
          <div class="user-avatar-circle">${initial}</div>
          <div class="user-header-details">
            <div class="user-header-name">${user.name} 🇮🇳</div>
            <div class="user-header-role">Cadet • Verified</div>
          </div>
        </div>
        <button class="btn btn-outline btn-sm btn-logout" id="btn-navbar-logout" title="Sign Out of GARUDA" style="color: #F87171; border-color: rgba(239, 68, 68, 0.4); padding: 0.28rem 0.55rem; font-size: 0.72rem; font-weight: 700; white-space: nowrap;">
          🚪 Logout
        </button>
      </div>
    `;

    // Logout Button Event Listener
    const logoutBtn = document.getElementById('btn-navbar-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await authManager.logout();
        renderAuthHeaderSection(onLogout);
        if (onLogout) onLogout();
      });
    }

    // Profile Click opens Preferences
    const profileBtn = document.getElementById('btn-navbar-profile');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.location.hash = '#preferences';
      });
    }
  } else {
    container.innerHTML = `
      <a href="#login" class="btn btn-primary btn-sm" id="btn-navbar-login" style="padding: 0.35rem 0.75rem; font-size: 0.82rem; text-decoration: none;">
        🔐 Cadet Login
      </a>
    `;
  }
}
