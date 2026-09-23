# 🇮🇳 GARUDA OS — Personal AI Mentor & Life Operating System

> **"Discipline is doing what needs to be done even when you don't feel like it. Execute the mission."**

GARUDA is a mobile-first Progressive Web App (PWA) and complete life & career operating system built specifically for defence aspirants and civil services candidates. It bridges long-term career ambitions with hourly execution discipline, AI guidance, and comprehensive performance metrics.

---

## 🎖️ Core Wings & Modules

1. **🏠 Today's Mission & Command Center**: 
   - 06:00 to 23:00 operational timeline with real-time slot indicators.
   - Top 3 mandatory daily priorities with completion tracking.
   - Instant strategic directive: **"What Should I Do Right Now?"**
   - Morning 06:00 Operational Briefing modal & recovery protocols.

2. **🪖 Indian Army Officer Preparation**:
   - Pathways for CDS, TGC, SSC-Tech, and AFCAT.
   - Tri-Service comparative rank hierarchy (Army, Navy, Air Force).
   - 7 Indian Army Commands, Headquarters & military history case studies.
   - Eligibility radar with B.Tech ECE cutoff tracking.

3. **🎖️ SSB Coach & Simulator**:
   - **Stage 1 (Screening)**: OIR test practice with score calculators.
   - **PPDT Simulator**: Hazy picture perception with an active 3-minute story timer.
   - **WAT Drill**: Rapid-fire 15-second per word psychological association.
   - **SRT & GD Practice**: 60 real-world situational scenarios and group discussion briefs.

4. **📚 UPSC Academy**:
   - 16-Step syllabus explorer covering GS1–GS4, Prelims, and Mains.
   - Interactive MCQ test runner with answer explanations and accuracy tracking.
   - Mains answer writing timer & self-evaluation scoring framework.

5. **💪 Athletic Fitness & Nutrition Tracker**:
   - Monday–Sunday push/pull/legs/running training split.
   - 16-glass water hydration logger (up to 4.0L daily target).
   - High-protein Indian food database (chicken, eggs, soya, paneer, dal, whey) with calorie, protein, and cost metrics.

6. **💻 IT Career & Software Engineering (Java Stack)**:
   - Placement roadmap for Core Java, Collections, Multithreading, SQL, and Spring Boot.
   - Built-in interactive code challenge runner with test cases.

7. **🏛️ Government Opportunities Radar**:
   - Real-time tracker for UPSC CSE, CDS, AFCAT, TGC, SSC CGL, APPSC, BEL, and DRDO.

8. **🤖 Strategic AI Mentor**:
   - Context-grounded advisory engine evaluating current weaknesses, test scores, study hours, and workout logs.

---

## 🔐 Architecture & Security

- **Database**: High-performance native SQLite (`node:sqlite` in WAL mode) with isolated multi-user tables:
  - `users` (credentials, target ambition, created timestamp)
  - `preferences` (display theme, custom daily schedule, alert toggles)
  - `user_data` (daily mission states, streaks, completion %, exam reports)
- **Authentication**:
  - Secure password hashing with **Bcrypt** (salt rounds = 10).
  - RFC 7519 standard **JSON Web Tokens (JWT)** signed via HMAC-SHA256.
  - Strict client-side route guards redirecting unauthenticated visitors to `/login`.
  - Top navbar cadet profile with instant **🚪 Logout** session purging.
- **Preferences Engine**:
  - Live toggle between **Tactical Dark Mode** (OLED black) and **Daylight Operations Mode**.
  - Customizable wake-up time, sleep time, and focus blocks.

---

## 🚀 Quick Start

### 1. Requirements
- Any modern web browser (Chrome, Edge, Safari, Firefox).
- Windows, macOS, or Linux.

### 2. Launch the Application
To run the server locally:
```powershell
# Using PowerShell
.\scripts\serve.ps1
```
Or directly with Node.js:
```bash
node --experimental-sqlite server.js
```

### 3. Access the Terminal
- **Desktop (Localhost)**: `http://localhost:8080/`
- **Mobile Device (Wi-Fi LAN)**: `http://<YOUR_LOCAL_IP>:8080/` (displayed on server launch)

### 4. Default Demo Account
- **Cadet Email**: `manoj@garuda.in`
- **Password**: `cadet2027` *(or click the "⚡ Instant Fill & Sign In" button on the login screen)*

---

## 🇮🇳 Jai Hind!
Built for cadets, officers, and civil servants in the making.
