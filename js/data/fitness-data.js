// ==========================================================================
// GARUDA OS - Fitness, Indian Nutrition & Health Database
// ==========================================================================

export const FITNESS_WORKOUT_SPLIT = {
  monday: {
    day: 'Monday',
    title: 'Chest + Triceps (Push Heavy)',
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: 4, reps: '8-10', targetRPE: 8 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', targetRPE: 8 },
      { name: 'Parallel Bar Dips (Bodyweight/Weighted)', sets: 3, reps: '10-12', targetRPE: 9 },
      { name: 'Cable Chest Flyes', sets: 3, reps: '12-15', targetRPE: 8 },
      { name: 'Overhead Tricep Rope Extension', sets: 3, reps: '12-15', targetRPE: 9 },
      { name: 'Push-Ups (Burnout set)', sets: 2, reps: 'Failure', targetRPE: 10 }
    ]
  },
  tuesday: {
    day: 'Tuesday',
    title: 'Back + Biceps (Pull Strength)',
    exercises: [
      { name: 'Conventional Deadlift', sets: 4, reps: '5-6', targetRPE: 8.5 },
      { name: 'Pull-Ups (Overhand Grip)', sets: 4, reps: '8-10', targetRPE: 9 },
      { name: 'Barbell Bent-Over Row', sets: 3, reps: '8-10', targetRPE: 8 },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', targetRPE: 8 },
      { name: 'Face Pulls (Rear Delts & Rotator Cuff)', sets: 3, reps: '15-20', targetRPE: 8 },
      { name: 'Standing Barbell Bicep Curl', sets: 3, reps: '10-12', targetRPE: 9 }
    ]
  },
  wednesday: {
    day: 'Wednesday',
    title: 'Legs + Core (Athletic Base)',
    exercises: [
      { name: 'Barbell Back Squats', sets: 4, reps: '6-8', targetRPE: 8.5 },
      { name: 'Romanian Deadlifts (Hamstrings)', sets: 3, reps: '10-12', targetRPE: 8 },
      { name: 'Bulgarian Split Squats (Unilateral)', sets: 3, reps: '10-12/leg', targetRPE: 8.5 },
      { name: 'Standing Calf Raises', sets: 4, reps: '15-20', targetRPE: 9 },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', targetRPE: 9 },
      { name: 'Plank Hold', sets: 3, reps: '60-90 sec', targetRPE: 8 }
    ]
  },
  thursday: {
    day: 'Thursday',
    title: 'Shoulders + Core (Military Press)',
    exercises: [
      { name: 'Standing Overhead Military Press (OHP)', sets: 4, reps: '6-8', targetRPE: 8.5 },
      { name: 'Dumbbell Lateral Raises (Side Delts)', sets: 4, reps: '12-15', targetRPE: 9 },
      { name: 'Bent-Over Dumbbell Reverse Flyes', sets: 3, reps: '15', targetRPE: 8 },
      { name: 'Barbell Shrugs (Traps)', sets: 3, reps: '12-15', targetRPE: 8 },
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '10-12', targetRPE: 9 }
    ]
  },
  friday: {
    day: 'Friday',
    title: 'Upper Body Hypertrophy & Arms',
    exercises: [
      { name: 'Incline Barbell Bench Press', sets: 3, reps: '8-10', targetRPE: 8 },
      { name: 'Close Grip Chin-Ups', sets: 3, reps: '8-10', targetRPE: 9 },
      { name: 'Dumbbell Arnold Press', sets: 3, reps: '10-12', targetRPE: 8 },
      { name: 'Incline Dumbbell Hammer Curls', sets: 3, reps: '10-12', targetRPE: 9 },
      { name: 'Skull Crushers (EZ Bar)', sets: 3, reps: '10-12', targetRPE: 9 }
    ]
  },
  saturday: {
    day: 'Saturday',
    title: 'Army Fitness Benchmark & Cardio',
    exercises: [
      { name: '1.6 km (1600m) Timed Run', target: 'Under 5:45 min (Army Excellent Standard)', note: 'Benchmark test' },
      { name: 'Push-Ups in 1 minute', target: '40+ Reps', note: 'Strict military form' },
      { name: 'Chin-Ups (Full Deadhang)', target: '10-12 Reps', note: 'Zero swinging' },
      { name: '5 km Aerobic Pace Run', target: '24-26 minutes', note: 'Endurance conditioning' },
      { name: 'Hip & Ankle Mobility Drills', target: '15 minutes', note: 'Injury prevention' }
    ]
  },
  sunday: {
    day: 'Sunday',
    title: 'Active Recovery & Deep Mobility',
    exercises: [
      { name: '10,000 Steps Outdoor Walk', target: 'Steady low intensity', note: 'Zone 1 recovery' },
      { name: 'Full Body Static Stretching', target: '20 minutes', note: 'Hamstrings, hip flexors, lats' },
      { name: 'Hydration & Electrolyte Refuel', target: '4.0 Litres water', note: 'Total system restoration' }
    ]
  }
};

export const INDIAN_FOOD_DATABASE = [
  { id: 'egg', name: 'Boiled Eggs (2 whole)', serving: '2 eggs (100g)', calories: 140, protein: 12, carbs: 1, fats: 10, fiber: 0, costRs: 14 },
  { id: 'egg_whites', name: 'Boiled Egg Whites (4 whites)', serving: '4 whites (130g)', calories: 68, protein: 14.5, carbs: 1, fats: 0.3, fiber: 0, costRs: 28 },
  { id: 'chicken', name: 'Chicken Breast (Cooked)', serving: '100g cooked', calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, costRs: 32 },
  { id: 'soya', name: 'Soya Chunks (Boiled)', serving: '50g raw', calories: 172, protein: 26, carbs: 16, fats: 0.5, fiber: 6, costRs: 12 },
  { id: 'paneer', name: 'Fresh Paneer', serving: '100g', calories: 265, protein: 18, carbs: 4, fats: 20, fiber: 0, costRs: 40 },
  { id: 'whey', name: 'Whey Protein Isolate/Conc', serving: '1 scoop (30g)', calories: 120, protein: 24, carbs: 2, fats: 1.5, fiber: 0, costRs: 65 },
  { id: 'dal_moong', name: 'Yellow Moong Dal (Cooked)', serving: '1 bowl (150g)', calories: 155, protein: 10, carbs: 25, fats: 1.5, fiber: 6, costRs: 14 },
  { id: 'dal_chana', name: 'Chana Dal / Kala Chana', serving: '1 bowl (150g)', calories: 180, protein: 11, carbs: 28, fats: 2.8, fiber: 8, costRs: 15 },
  { id: 'roasted_chana', name: 'Roasted Bhuna Chana', serving: '50g snack', calories: 185, protein: 11, carbs: 29, fats: 3, fiber: 8, costRs: 12 },
  { id: 'milk', name: 'Toned Cow Milk', serving: '1 glass (250ml)', calories: 150, protein: 8, carbs: 12, fats: 7.5, fiber: 0, costRs: 16 },
  { id: 'curd', name: 'Fresh Curd / Dahi', serving: '1 cup (200g)', calories: 120, protein: 7, carbs: 9, fats: 6, fiber: 0, costRs: 15 },
  { id: 'oats', name: 'Rolled Oats with Water', serving: '50g raw', calories: 190, protein: 6.5, carbs: 33, fats: 3.5, fiber: 5, costRs: 18 },
  { id: 'rice', name: 'Steamed Basmati/Sona Rice', serving: '1 bowl (150g)', calories: 195, protein: 4, carbs: 44, fats: 0.4, fiber: 1, costRs: 8 },
  { id: 'roti', name: 'Whole Wheat Roti (2 rotis)', serving: '2 rotis (70g)', calories: 180, protein: 6, carbs: 36, fats: 1.5, fiber: 5, costRs: 6 },
  { id: 'peanuts', name: 'Roasted Peanuts', serving: '30g', calories: 170, protein: 8, carbs: 5, fats: 14, fiber: 2.5, costRs: 8 },
  { id: 'peanut_butter', name: 'Natural Peanut Butter', serving: '2 tbsp (32g)', calories: 190, protein: 8, carbs: 6, fats: 16, fiber: 2, costRs: 18 },
  { id: 'almonds', name: 'Raw Almonds (Badam)', serving: '12 nuts (15g)', calories: 90, protein: 3.2, carbs: 3, fats: 7.5, fiber: 1.8, costRs: 15 },
  { id: 'banana', name: 'Banana (Pre-workout)', serving: '1 medium (110g)', calories: 105, protein: 1.3, carbs: 27, fats: 0.3, fiber: 3, costRs: 6 },
  { id: 'sweet_potato', name: 'Boiled Shakarkandi (Sweet Potato)', serving: '150g', calories: 130, protein: 2.3, carbs: 30, fats: 0.2, fiber: 4.5, costRs: 12 },
  { id: 'greens', name: 'Palak / Mixed Green Sabzi', serving: '1 bowl (150g)', calories: 75, protein: 3, carbs: 9, fats: 3, fiber: 4, costRs: 20 }
];
