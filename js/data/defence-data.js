// ==========================================================================
// GARUDA OS - Indian Army Officer Entries, Commands, Ranks, Operations, Weapons
// ==========================================================================

export const ARMY_OFFICER_ENTRIES = [
  {
    id: 'cds-ima',
    name: 'CDS — Indian Military Academy (IMA), Dehradun',
    type: 'Permanent Commission',
    minAge: 19,
    maxAge: 24,
    education: 'Degree of a recognised University or equivalent (B.Tech ECE eligible)',
    examRequired: 'UPSC Combined Defence Services (CDS) Written Exam (English, GK, Elementary Maths)',
    ssbRequired: '5-Day SSB Interview',
    trainingAcademy: 'IMA, Dehradun',
    trainingDuration: '18 Months',
    notificationCycles: 'Twice a year (CDS-I: Dec-Jan notification, April exam; CDS-II: May-June notification, Sept exam)',
    officialSite: 'https://upsc.gov.in',
    currentStatus: 'Eligible & Target Entry'
  },
  {
    id: 'cds-ota',
    name: 'CDS — Officers Training Academy (OTA), Chennai',
    type: 'Short Service Commission (SSC)',
    minAge: 19,
    maxAge: 25,
    education: 'Graduation Degree from recognized university (B.Tech ECE eligible)',
    examRequired: 'UPSC CDS Written Exam (English & General Knowledge only — No Maths paper)',
    ssbRequired: '5-Day SSB Interview',
    trainingAcademy: 'OTA, Chennai',
    trainingDuration: '49 Weeks (11 Months)',
    notificationCycles: 'Twice a year with CDS-I and CDS-II',
    officialSite: 'https://upsc.gov.in',
    currentStatus: 'Eligible & Target Entry'
  },
  {
    id: 'tgc',
    name: 'TGC — Technical Graduate Course (Army)',
    type: 'Permanent Commission (Tech)',
    minAge: 20,
    maxAge: 27,
    education: 'BE / B.Tech in Electronics & Communication Engineering (ECE) or allied stream',
    examRequired: 'NO WRITTEN EXAM (Direct Shortlisting based on Engineering CGPA/Cutoff percentage)',
    ssbRequired: 'Direct 5-Day SSB Call Letter for shortlisted candidates',
    trainingAcademy: 'IMA, Dehradun',
    trainingDuration: '1 Year',
    notificationCycles: 'Twice a year (Applications around April/May for Jan course and Sept/Oct for July course)',
    officialSite: 'https://joinindianarmy.nic.in',
    currentStatus: 'High Priority (Final Year / Graduate ECE Eligible)'
  },
  {
    id: 'ssc-tech',
    name: 'SSC (Tech) Men — Officers Training Academy',
    type: 'Short Service Commission (Tech)',
    minAge: 20,
    maxAge: 27,
    education: 'BE / B.Tech in Electronics & Communication Engineering (ECE)',
    examRequired: 'NO WRITTEN EXAM (Direct Shortlisting based on Engineering Marks)',
    ssbRequired: 'Direct 5-Day SSB Call Letter',
    trainingAcademy: 'OTA, Chennai',
    trainingDuration: '49 Weeks',
    notificationCycles: 'Twice a year (Applications open Jan/Feb for Oct course, and July/Aug for April course)',
    officialSite: 'https://joinindianarmy.nic.in',
    currentStatus: 'High Priority (Direct SSB Pathway)'
  }
];

export const ARMY_COMMANDS = [
  { name: 'Northern Command', hq: 'Udhampur, J&K', role: 'Operational control of LoC and LAC in J&K and Ladakh' },
  { name: 'Western Command', hq: 'Chandimandir, Haryana', role: 'Secures Indo-Pak international border in Punjab and Haryana' },
  { name: 'Eastern Command', hq: 'Kolkata, West Bengal', role: 'Guards borders with China (LAC), Myanmar, and Bangladesh' },
  { name: 'Southern Command', hq: 'Pune, Maharashtra', role: 'Covers peninsular India, Gujarat and Rajasthan borders' },
  { name: 'Central Command', hq: 'Lucknow, Uttar Pradesh', role: 'Central strategic sector including Uttarakhand LAC and Nepal border' },
  { name: 'South Western Command', hq: 'Jaipur, Rajasthan', role: 'Strike and defensive formations along Thar desert and Punjab border' },
  { name: 'Army Training Command (ARTRAC)', hq: 'Shimla, Himachal Pradesh', role: 'Formulates doctrine, military strategy, and institutional officer training' }
];

export const ARMY_RANKS_ORDER = [
  { rank: 'Lieutenant', stars: 'Two Five-Pointed Stars', role: 'Platoon Commander (First commission from IMA/OTA)' },
  { rank: 'Captain', stars: 'Three Five-Pointed Stars', role: 'Second-in-Command of Company' },
  { rank: 'Major', stars: 'National Emblem (Ashoka Lion)', role: 'Company Commander (120-150 soldiers)' },
  { rank: 'Lieutenant Colonel', stars: 'National Emblem and One Star', role: 'Battalion 2IC / Key Staff Officer' },
  { rank: 'Colonel', stars: 'National Emblem and Two Stars', role: 'Battalion Commander (CO of ~1000 soldiers)' },
  { rank: 'Brigadier', stars: 'National Emblem and Three Stars in Triangle', role: 'Brigade Commander (~3000-4000 troops)' },
  { rank: 'Major General', stars: 'Crossed Baton and Sabre with One Star', role: 'Division Commander (~15,000 troops)' },
  { rank: 'Lieutenant General', stars: 'Crossed Baton and Sabre with National Emblem', role: 'Corps / Army Commander (VCOAS / GOC-in-C)' },
  { rank: 'General', stars: 'Crossed Baton and Sabre with Star and National Emblem', role: 'Chief of the Army Staff (COAS) / CDS' }
];

export const MAJOR_MILITARY_OPERATIONS = [
  { year: '1947-48', name: 'First Kashmir War', detail: 'Defended Srinagar and Kashmir against Pakistani tribal raiders; saved Poonch and Ladakh.' },
  { year: '1965', name: 'Second Indo-Pak War', detail: 'Battle of Asal Uttar (graveyard of Patton tanks) and capture of Haji Pir Pass.' },
  { year: '1971', name: 'Liberation of Bangladesh', detail: 'Decisive 13-day lightning campaign, Battle of Longewala, unconditional surrender of 93,000 Pakistani soldiers in Dhaka.' },
  { year: '1984', name: 'Operation Meghdoot', detail: 'Pre-emptive assault to capture the Siachen Glacier heights; world’s highest battlefield.' },
  { year: '1999', name: 'Operation Vijay (Kargil War)', detail: 'Recaptured fortified Himalayan peaks (Tiger Hill, Tololing) from Pakistani intruders in extreme altitude.' },
  { year: '2016', name: 'Surgical Strikes', detail: 'Targeted destruction of launchpads across the Line of Control following Uri incident.' }
];

export const INDIGENOUS_DEFENCE_TECH = [
  { name: 'Tejas Mk-1A', type: 'Light Combat Aircraft (LCA)', agency: 'HAL / ADA', specs: 'AESA radar, Astra BVR missile, fly-by-wire agility' },
  { name: 'BrahMos', type: 'Supersonic Cruise Missile', agency: 'BrahMos Aerospace (India-Russia JV)', specs: 'Mach 3 speed, fire-and-forget, pin-point precision, land/sea/air launched' },
  { name: 'Zorawar', type: 'Light Mountain Tank (25-tonne)', agency: 'DRDO & L&T', specs: 'Designed specifically for high-altitude desert and Ladakh plateau operations against Chinese light tanks' },
  { name: 'Arjun Mk-1A', type: 'Main Battle Tank (MBT)', agency: 'DRDO CVRDE', specs: 'Kanchan composite armour, hunter-killer target capability, 120mm rifled gun' },
  { name: 'Akash Air Defence System', type: 'Surface-to-Air Missile (SAM)', agency: 'DRDO / BDL', specs: 'Multi-target capability, Rajendra 3D radar, 25-30 km interception' },
  { name: 'Pinaka Multi-Barrel Rocket Launcher', type: 'Artillery Rocket System', agency: 'DRDO ARDE', specs: 'Fires 12 HE rockets in 44 seconds up to 75 km range with GPS guidance' }
];

export const OFFICER_LIKE_QUALITIES = [
  { factor: 'Factor I: Planning & Organising', qualities: ['Effective Intelligence', 'Reasoning Ability', 'Organising Ability', 'Power of Expression'] },
  { factor: 'Factor II: Social Adjustment', qualities: ['Social Adaptability', 'Cooperation', 'Sense of Responsibility'] },
  { factor: 'Factor III: Social Effectiveness', qualities: ['Initiative', 'Self-Confidence', 'Speed of Decision', 'Ability to Influence the Group', 'Liveliness'] },
  { factor: 'Factor IV: Dynamic Qualities', qualities: ['Determination', 'Courage', 'Stamina'] }
];
