// ==========================================================================
// GARUDA OS - Database & Authentication Engine (IndexedDB + Server REST API)
// ==========================================================================

const DB_NAME = 'GarudaDB';
const DB_VERSION = 1;

class DatabaseManager {
  constructor() {
    this.db = null;
    this.currentUser = this.loadActiveSession();
    this.initIndexedDB();
  }

  // Initialize IndexedDB
  initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'email' });
          userStore.createIndex('name', 'name', { unique: false });
        }

        if (!db.objectStoreNames.contains('user_data')) {
          db.createObjectStore('user_data', { keyPath: 'email' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('[GARUDA DB] IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.warn('[GARUDA DB] IndexedDB error, operating on local storage fallback:', event.target.error);
        resolve(null);
      };
    });
  }

  loadActiveSession() {
    try {
      const session = localStorage.getItem('garuda_active_user');
      return session ? JSON.parse(session) : {
        name: 'Manoj',
        email: 'manoj@garuda.in',
        targetGoal: 'Indian Army Officer & UPSC',
        role: 'Officer Cadet',
        isLoggedIn: true
      };
    } catch (e) {
      return null;
    }
  }

  saveActiveSession(user) {
    this.currentUser = { ...user, isLoggedIn: true };
    localStorage.setItem('garuda_active_user', JSON.stringify(this.currentUser));
  }

  clearSession() {
    this.currentUser = null;
    localStorage.removeItem('garuda_active_user');
  }

  // Account Authentication - Login
  async login(email, password) {
    try {
      // 1. Try server REST database API first
      const res = await fetch('./api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          this.saveActiveSession(data.user);
          // Try pulling latest cloud/disk progress
          this.pullServerProgress(data.user.email);
          return { success: true, user: data.user };
        }
      }
    } catch (err) {
      console.log('[GARUDA DB] Server API offline/unreachable, checking local IndexedDB cache...');
    }

    // 2. Offline / Local fallback validation
    if (email.toLowerCase() === 'manoj@garuda.in' && (password === 'cadet2027' || password === 'admin' || password === '1234')) {
      const user = {
        name: 'Manoj',
        email: 'manoj@garuda.in',
        targetGoal: 'Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services',
        btechBranch: 'ECE',
        graduationYear: 2027
      };
      this.saveActiveSession(user);
      return { success: true, user };
    }

    // Check IndexedDB
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const req = store.get(email.toLowerCase().trim());

        req.onsuccess = () => {
          const user = req.result;
          if (user && user.password === password) {
            this.saveActiveSession(user);
            resolve({ success: true, user });
          } else {
            resolve({ success: false, error: 'Invalid email or password.' });
          }
        };
        req.onerror = () => resolve({ success: false, error: 'Database read error.' });
      });
    }

    return { success: false, error: 'Invalid credentials or account does not exist.' };
  }

  // Account Registration
  async register(userData) {
    const userPayload = {
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      targetGoal: userData.targetGoal || 'Indian Army Officer & UPSC',
      btechBranch: userData.btechBranch || 'Electronics & Communication Engineering',
      graduationYear: userData.graduationYear || 2027
    };

    // 1. Try server REST database API first
    try {
      const res = await fetch('./api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          this.saveActiveSession(data.user);
          this.saveToIndexedDB('users', data.user);
          return { success: true, user: data.user };
        } else {
          return { success: false, error: data.error };
        }
      } else if (res.status === 409) {
        return { success: false, error: 'Account with this email already exists.' };
      }
    } catch (err) {
      console.log('[GARUDA DB] Server API offline, saving to IndexedDB locally...');
    }

    // 2. Local fallback registration
    if (this.db) {
      await this.saveToIndexedDB('users', userPayload);
      this.saveActiveSession(userPayload);
      return { success: true, user: userPayload };
    }

    this.saveActiveSession(userPayload);
    return { success: true, user: userPayload };
  }

  saveToIndexedDB(storeName, data) {
    if (!this.db) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(data);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // Sync Progress State to Disk Database
  async syncServerProgress(email, statePayload) {
    if (!email) return;
    try {
      await fetch('./api/data/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, payload: statePayload })
      });
    } catch (e) {
      // Offline
    }

    if (this.db) {
      this.saveToIndexedDB('user_data', { email, payload: statePayload, lastSaved: new Date().toISOString() });
    }
  }

  // Pull Latest Progress State from Disk Database
  async pullServerProgress(email) {
    if (!email) return null;
    try {
      const res = await fetch(`./api/data/sync?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.payload) {
          return data.payload;
        }
      }
    } catch (e) {
      // Offline
    }
    return null;
  }
}

export const dbManager = new DatabaseManager();
