// ==========================================================================
// GARUDA OS - 20-Question Onboarding Engine & Multi-Horizon Roadmap Generator
// ==========================================================================

import { store } from './store.js';

export const ONBOARDING_QUESTIONS = [
  { id: 'upscKnowledge', q: '1. What is your current UPSC knowledge baseline?', type: 'select', options: ['Absolute Beginner (Zero NCERT background)', 'Foundation Phase (Read a few NCERTs / Basic Polity)', 'Intermediate (Covered standard books once)', 'Advanced (Appeared in Prelims / Mains)'] },
  { id: 'upscExperience', q: '2. Have you appeared in any UPSC CSE attempts previously?', type: 'select', options: ['None (Fresh Candidate)', '1 Attempt (Prelims)', '2+ Attempts'] },
  { id: 'targetAttempt', q: '3. What is your primary target UPSC CSE attempt year?', type: 'select', options: ['2026 Attempt', '2027 Attempt (Recommended for Final Year B.Tech)', '2028 Attempt'] },
  { id: 'dailyHours', q: '4. How many hours can you genuinely dedicate each day?', type: 'select', options: ['8-10 Hours (Final Year / Dedicated)', '10-12 Hours (Full-Time Mode)', '6-8 Hours (Managing heavy college load)'] },
  { id: 'currentBooks', q: '5. Which primary resources have you acquired?', type: 'text', placeholder: 'e.g. Laxmikanth Polity, PMFIAS Geography, NCERTs, The Hindu' },
  { id: 'optionalSubject', q: '6. What is your Optional Subject status for Mains?', type: 'select', options: ['Decided: PSIR / Sociology / Geography / History', 'Evaluating between 2 options', 'Yet to decide (Focusing on GS Foundation)'] },
  { id: 'armyHistory', q: '7. Have you appeared in CDS or any Army entry previously?', type: 'select', options: ['Fresh Candidate (Preparing for first attempt)', 'Appeared in CDS written exam', 'Screened Out in SSB', 'Conference Out in SSB', 'Recommended previously'] },
  { id: 'armyEligibility', q: '8. Verify your Army Officer entry eligibility profile:', type: 'select', options: ['B.Tech ECE Final Year (Eligible for CDS, TGC, SSC-Tech)', 'B.Tech Graduate with > 65% aggregate', 'Other'] },
  { id: 'ssbExperience', q: '9. What is your current familiarity with 5-Day SSB procedure?', type: 'select', options: ['Beginner (Know basic stages)', 'Practiced Stage-1 OIR & PPDT', 'Practiced Stage-2 Psychology & GD', 'Attended prior SSB interview'] },
  { id: 'javaLevel', q: '10. What is your current Java technical proficiency?', type: 'select', options: ['Beginner (Syntax & loops)', 'Intermediate (OOP, Collections, Exceptions)', 'Advanced (Multithreading, Spring Boot, REST APIs)'] },
  { id: 'sqlLevel', q: '11. What is your SQL & Database proficiency level?', type: 'select', options: ['Basic SELECT & WHERE queries', 'Intermediate (Joins, GROUP BY, Aggregations)', 'Advanced (Subqueries, Indexing, Transactions)'] },
  { id: 'webDevLevel', q: '12. What is your Web Development proficiency level?', type: 'select', options: ['Beginner (HTML/CSS)', 'Intermediate (JavaScript, DOM, APIs)', 'Advanced (Full Stack development)'] },
  { id: 'fitnessLevel', q: '13. What is your current physical fitness condition?', type: 'select', options: ['Beginner (Can run 1 km, <15 push-ups)', 'Intermediate (Can run 3-5 km, 25-35 push-ups)', 'Athletic (1600m < 6:00 min, 40+ push-ups, 10 pull-ups)'] },
  { id: 'weightKg', q: '14. What is your current body weight in kilograms?', type: 'number', placeholder: '71' },
  { id: 'heightCm', q: '15. What is your current height in centimeters?', type: 'number', placeholder: '176' },
  { id: 'currentWorkout', q: '16. What does your current physical training look like?', type: 'select', options: ['Gym Weight Training + Cardio (5-6 days/week)', 'Running / Calisthenics outdoor', 'Irregular workout', 'Sedentary (Starting now)'] },
  { id: 'sleepSchedule', q: '17. What is your current sleep pattern?', type: 'select', options: ['7-8 Hours (Consistent 23:00 to 06:00)', '6-7 Hours', 'Irregular / Night Owl (<6 hours)'] },
  { id: 'englishLevel', q: '18. How confident are you in English communication & GD?', type: 'select', options: ['Fluent & Confident in public speaking', 'Good written English, hesitant in speaking/GD', 'Basic working English (Needs active vocabulary drills)'] },
  { id: 'govtInterests', q: '19. Which government exams do you want to track automatically?', type: 'text', placeholder: 'UPSC CSE, CDS, TGC, SSC-Tech, APPSC Group 1, CAPF AC' },
  { id: 'jobTimeline', q: '20. What is your target timeline for first job placement / commission?', type: 'select', options: ['Next 6-12 Months (Campus Placement + CDS/TGC Call)', '12-18 Months (Commissioning into IMA/OTA or Civil Services)'] }
];

export class OnboardingEngine {
  generatePlans(answers) {
    return {
      sevenDayPlan: {
        title: '7-Day Shock-Absorption & Rhythm Establishment',
        goal: 'Establish unbreakable 06:00 to 23:00 daily rhythm without burn-out.',
        items: [
          'Day 1-2: Complete Indian Polity Preamble & Articles 12-18. Log 45-min chest workout.',
          'Day 3-4: Polity Articles 19-32. Solve 30 MCQs. Practice 15 WAT words and 1 PPDT story.',
          'Day 5-6: Java Collections (ArrayList & HashMap) + 3 coding problems. Back & Biceps gym split.',
          'Day 7: Sunday Weekly Review, 1600m timed run benchmark, lock next week’s targets.'
        ]
      },
      thirtyDayPlan: {
        title: '30-Day Foundation & Core Mastery',
        goal: 'Complete Constitutional Polity, build 5km running stamina, master Core Java OOP.',
        items: [
          'UPSC: Complete entire Indian Polity (Laxmikanth Chapters 1-25) + 300 MCQs + 10 Mains answers.',
          'Army / SSB: Complete 100 OIR questions, 10 PPDT sessions, 60 WAT words, memorise Army Commands & Ranks.',
          'Fitness: Achieve 40 strict push-ups, 8 deadhang pull-ups, and run 5km in under 26 minutes.',
          'IT Career: Finish Java OOP, Collections Framework, and SQL Joins with 20 solved problems.'
        ]
      },
      ninetyDayPlan: {
        title: '90-Day Tactical Acceleration',
        goal: 'Cover Modern Indian History + Indian Economy, run 1600m < 5:45 min, Spring Boot basics.',
        items: [
          'UPSC: Finish Modern History (Spectrum) + Macroeconomics (NCERT + Vivek Singh/Ramesh Singh).',
          'Army / SSB: Complete full 60 SRT battery, formalise Self-Description (SD), participate in 4 mock GDs.',
          'Fitness: Peak muscular strength; 1600m timed run at Army "Excellent" benchmark.',
          'IT Career: Build 1 full-stack Spring Boot REST API project with MySQL database for campus drives.'
        ]
      },
      sixMonthPlan: {
        title: '6-Month Comprehensive Readiness',
        goal: 'GS Foundation completion (Geography & Environment), CDS Written clearance, IT campus offer.',
        items: [
          'UPSC: GS-I, GS-II, GS-III foundation complete. Shift to full-length Prelims mocks and CSAT tests.',
          'Army Entry: File applications for CDS-I, TGC, and SSC-Tech upon notification opening.',
          'SSB Coaching: Full Stage-1 and Stage-2 psychological battery rehearsal and Mock Personal Interview.',
          'Career: Secure baseline IT software engineer offer as strategic career backup.'
        ]
      },
      twelveMonthRoadmap: {
        title: '12-Month Master Mission Roadmap',
        goal: 'SSB Recommendation for IMA/OTA or UPSC Civil Services Prelims clearance.',
        items: [
          'Q1: Foundation mastery & physical athletic transformation.',
          'Q2: CDS Written examination & high-score percentile clearance.',
          'Q3: Attend 5-Day SSB Interview at Selection Centre (Allahabad/Bhopal/Bengaluru/Jalandhar).',
          'Q4: Final Merit List / All-India Ranking & Academy joining preparation.'
        ]
      }
    };
  }
}

export const onboardingEngine = new OnboardingEngine();
