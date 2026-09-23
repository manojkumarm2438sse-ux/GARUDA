// ==========================================================================
// GARUDA OS - Authentication Manager & Session State (RFC 7519 JWT)
// ==========================================================================

const TOKEN_KEY = 'garuda_jwt_token';
const USER_KEY = 'garuda_jwt_user';

class AuthManager {
  constructor() {
    this.token = this.loadToken();
    this.user = this.loadUser();
    this.cachedPreferences = null;
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
      // Compatibility with existing local session key
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

  // 1. SIGNUP
  async signup(data) {
    try {
      const res = await fetch('./api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        this.setSession(result.token, result.user);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Signup failed' };
    } catch (err) {
      return { success: false, error: 'Network error connecting to authentication server: ' + err.message };
    }
  }

  // 2. LOGIN
  async login(email, password) {
    try {
      const res = await fetch('./api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        this.setSession(result.token, result.user);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Invalid credentials' };
    } catch (err) {
      return { success: false, error: 'Network error connecting to authentication server: ' + err.message };
    }
  }

  // 3. LOGOUT
  async logout() {
    try {
      await fetch('./api/auth/logout', { method: 'POST' });
    } catch (e) {
      // Offline fallback
    }
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
      // If 401 or invalid token, clear session
      this.clearSession();
      return null;
    } catch (e) {
      // If offline, trust local session if available
      return this.user ? { success: true, user: this.user, preferences: this.cachedPreferences } : null;
    }
  }

  // 5. FETCH PER-USER DASHBOARD DATA FROM DATABASE
  async fetchDashboard() {
    if (!this.token) return null;
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
    } catch (err) {
      console.warn('[GARUDA AUTH] Dashboard fetch error:', err);
    }
    return null;
  }

  // 6. SAVE PER-USER DASHBOARD DATA TO DATABASE
  async saveDashboard(payload) {
    if (!this.token) return false;
    try {
      const res = await fetch('./api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      console.warn('[GARUDA AUTH] Dashboard sync error:', err);
      return false;
    }
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
    return null;
  }

  // 8. UPDATE PREFERENCES
  async updatePreferences(prefData) {
    if (!this.token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('./api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(prefData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        this.cachedPreferences = data.preferences;
        if (prefData.target_goal && this.user) {
          this.user.target_goal = prefData.target_goal;
          localStorage.setItem(USER_KEY, JSON.stringify(this.user));
        }
        return { success: true, preferences: data.preferences };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
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
