// ==========================================================================
// GARUDA OS - Central State Store & Persistence Layer
// ==========================================================================

import { UPSC_TOPICS_DATABASE, UPSC_MCQ_BANK, UPSC_FLASHCARDS } from './data/syllabus-data.js';
import { GOVT_JOBS_DATABASE } from './data/jobs-data.js';
import { IT_CURRICULUM } from './data/it-data.js';

const STORAGE_KEY = 'garuda_os_state_v1';

const DEFAULT_PROFILE = {
  name: 'Manoj',
  targetGoal: 'Indian Army Officer (IMA/OTA/TGC) & UPSC Civil Services',
  age: 21,
  heightCm: 176,
  weightKg: 71,
  waistInches: 31,
  fitnessLevel: 'Intermediate (Athletic build)',
  btechBranch: 'Electronics & Communication Engineering (ECE)',
  graduationYear: 2027,
  cgpa: 8.2,
  technicalSkills: ['Java', 'SQL', 'HTML/CSS/JS', 'Spring Boot Basics', 'Git'],
  javaLevel: 'Intermediate (OOP & Collections in progress)',
  sqlLevel: 'Intermediate (Queries, Joins, Aggregation)',
  webDevLevel: 'Intermediate (Modern Vanilla JS & Responsive CSS)',
  englishLevel: 'Advanced Working Proficiency',
  upscPrepLevel: 'Foundation Phase (4-6 Months)',
  ssbPrepLevel: 'Beginner to Intermediate (Stage-1 Cleared prep)',
  armyEntryPrepLevel: 'Active (CDS + TGC/SSC-Tech Radar)',
  govtExamInterests: ['UPSC CSE', 'CDS', 'TGC', 'SSC-Tech', 'APPSC Group-1', 'CAPF AC', 'BEL ECE'],
  itJobInterests: ['Java Full Stack Developer', 'Software Engineer', 'Backend Specialist'],
  targetUpscAttempt: '2027',
  targetArmyEntries: ['CDS-I 2027', 'TGC-143', 'SSC-Tech-63'],
  dailyAvailableHours: 12,
  sleepSchedule: '23:00 - 06:00 (7 Hours)',
  fitnessGoals: 'Lean + Muscular + Athletic (1600m < 5:45 min, 40+ Push-ups, 10+ Pull-ups)',
  nutritionPreference: 'High Protein Indian (Eggs, Chicken, Soya, Dal, Paneer, Curd)',
  monthlyFoodBudgetRs: 6500,
  streakDays: 8,
  lastCheckInDate: '2026-09-22',
  theme: 'dark'
};

const DEFAULT_TODAY_MISSION = {
  date: '2026-09-23',
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

class Store {
  constructor() {
    this.subscribers = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          profile: { ...DEFAULT_PROFILE, ...parsed.profile },
          todayMission: { ...DEFAULT_TODAY_MISSION, ...parsed.todayMission },
          upscTopics: parsed.upscTopics || UPSC_TOPICS_DATABASE,
          mcqHistory: parsed.mcqHistory || [],
          mainsAnswers: parsed.mainsAnswers || [],
          workoutLogs: parsed.workoutLogs || [],
          nutritionLogs: parsed.nutritionLogs || [],
          itCurriculum: parsed.itCurriculum || IT_CURRICULUM,
          govtJobs: parsed.govtJobs || GOVT_JOBS_DATABASE,
          mentorChatHistory: parsed.mentorChatHistory || [
            {
              sender: 'mentor',
              time: '06:00',
              text: 'Good morning, Manoj. Today’s primary focus is rectifying your weak area in UPSC Fundamental Rights (currently at 62% accuracy) and logging your Chest & Triceps gym session. Discipline is doing what needs to be done even when you don’t feel like it. Execute the mission.'
            }
          ],
          dailyReports: parsed.dailyReports || [],
          badgesUnlocked: parsed.badgesUnlocked || ['7_day_streak', 'first_mains_answer', 'officer_mindset', '100_study_hours']
        };
      }
    } catch (e) {
      console.error('[Store] Failed to load state from localStorage:', e);
    }

    return {
      profile: { ...DEFAULT_PROFILE },
      todayMission: { ...DEFAULT_TODAY_MISSION },
      upscTopics: [...UPSC_TOPICS_DATABASE],
      mcqHistory: [
        { id: 'test-1', date: '2026-09-22', subjectId: 'polity', totalQuestions: 15, score: 11, accuracy: 73, mistakes: ['Art 15 vs 16 scope', 'Non-justiciability of Preamble'] }
      ],
      mainsAnswers: [
        { id: 'ans-1', date: '2026-09-21', questionId: 'polity-fr', title: 'Evolution of Article 21', words: 245, score: '6.5/10', feedback: 'Good constitutional citations (Puttaswamy, Maneka Gandhi). Missing international comparison.' }
      ],
      workoutLogs: [
        { date: '2026-09-22', title: 'Back + Biceps', sets: 18, durationMin: 65, prs: 'Deadlift 110kg x 5 reps' }
      ],
      nutritionLogs: [],
      itCurriculum: [...IT_CURRICULUM],
      govtJobs: [...GOVT_JOBS_DATABASE],
      mentorChatHistory: [
        {
          sender: 'mentor',
          time: '06:00',
          text: 'Good morning, Manoj. Today’s primary focus is rectifying your weak area in UPSC Fundamental Rights (currently at 62% accuracy) and executing your chest workout. Execute the mission with military precision.'
        }
      ],
      dailyReports: [],
      badgesUnlocked: ['7_day_streak', 'first_mains_answer', 'officer_mindset', '100_study_hours']
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notifySubscribers();
    } catch (e) {
      console.error('[Store] Failed to save state:', e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(fn => {
      try {
        fn(this.state);
      } catch (err) {
        console.error('[Store] Subscriber callback error:', err);
      }
    });
  }

  // Profile Mutations
  updateProfile(updates) {
    this.state.profile = { ...this.state.profile, ...updates };
    this.saveState();
  }

  // Mission Task Toggles
  toggleTask(pillar, field) {
    if (this.state.todayMission[pillar]) {
      this.state.todayMission[pillar][field] = !this.state.todayMission[pillar][field];
      this.recalculateDailyCompletion();
      this.saveState();
    }
  }

  togglePriority(priorityId) {
    const p = this.state.todayMission.topPriorities.find(item => item.id === priorityId);
    if (p) {
      p.done = !p.done;
      this.recalculateDailyCompletion();
      this.saveState();
    }
  }

  recalculateDailyCompletion() {
    let totalItems = 0;
    let completedItems = 0;

    // Check priorities
    this.state.todayMission.topPriorities.forEach(p => {
      totalItems++;
      if (p.done) completedItems++;
    });

    // Check UPSC
    const u = this.state.todayMission.upsc;
    totalItems += 3;
    if (u.currentAffairsDone) completedItems++;
    if (u.revisionDone) completedItems++;
    if (u.mcqCompleted >= u.mcqTarget) completedItems++;

    // Check Army & SSB
    const a = this.state.todayMission.army;
    totalItems += 3;
    if (a.doneAwareness) completedItems++;
    if (a.doneOfficer) completedItems++;
    if (a.doneEntry) completedItems++;

    const s = this.state.todayMission.ssb;
    totalItems += 4;
    if (s.doneOir) completedItems++;
    if (s.donePpdt) completedItems++;
    if (s.donePsych) completedItems++;
    if (s.doneInterview) completedItems++;

    // Check Fitness
    const f = this.state.todayMission.fitness;
    totalItems += 2;
    if (f.workoutCompleted) completedItems++;
    if (f.waterLiters >= 3.5) completedItems++;

    // Check IT
    const it = this.state.todayMission.it;
    totalItems += 3;
    if (it.doneJava) completedItems++;
    if (it.doneSql) completedItems++;
    if (it.codingProblemsSolved >= it.codingTarget) completedItems++;

    const pct = Math.round((completedItems / totalItems) * 100);
    this.state.todayMission.completionPercentage = pct;
  }

  // Log Hydration
  addWater(glasses = 1) {
    const current = this.state.todayMission.fitness.waterLiters || 0;
    this.state.todayMission.fitness.waterLiters = Math.min(6.0, +(current + (glasses * 0.25)).toFixed(2));
    this.recalculateDailyCompletion();
    this.saveState();
  }

  // Log Nutrition Item
  addFoodItem(food) {
    const nut = this.state.todayMission.fitness.nutrition;
    nut.calories += food.calories;
    nut.proteinG += food.protein;
    nut.carbsG += food.carbs;
    nut.fatsG += food.fats;
    nut.fiberG += (food.fiber || 0);

    this.state.nutritionLogs.unshift({
      timestamp: new Date().toISOString(),
      foodName: food.name,
      calories: food.calories,
      protein: food.protein,
      costRs: food.costRs
    });
    this.saveState();
  }

  // Update Topic Mastery
  updateTopicStatus(topicId, newStatus) {
    const topic = this.state.upscTopics.find(t => t.id === topicId);
    if (topic) {
      topic.status = newStatus;
      if (newStatus.includes('Revised')) {
        topic.revisionCount = (topic.revisionCount || 0) + 1;
        topic.lastRevised = new Date().toISOString().split('T')[0];
      }
      this.saveState();
    }
  }

  // Add MCQ Test Result
  recordMcqTest(result) {
    this.state.mcqHistory.unshift(result);
    // If accuracy is poor, mark topic weak
    if (result.topicId && result.accuracy < 65) {
      this.updateTopicStatus(result.topicId, 'Weak');
    }
    this.saveState();
  }

  // Add Mentor Message
  addMentorChat(sender, text) {
    this.state.mentorChatHistory.push({
      sender,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    });
    this.saveState();
  }

  // Export JSON Backup
  exportData() {
    const jsonStr = JSON.stringify(this.state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `garuda_os_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import JSON Backup
  importData(jsonContent) {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed.profile) {
        this.state = parsed;
        this.saveState();
        return true;
      }
    } catch (e) {
      console.error('[Store] Import parse error:', e);
    }
    return false;
  }
}

export const store = new Store();
