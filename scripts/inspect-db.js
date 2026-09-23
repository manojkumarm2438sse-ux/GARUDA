const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const db = new DatabaseSync(path.join(__dirname, '..', 'data', 'garuda.db'));
console.log('--- USERS TABLE ---');
console.table(db.prepare('SELECT id, name, email, target_goal, created_at FROM users').all());

console.log('--- PREFERENCES TABLE ---');
console.table(db.prepare('SELECT user_id, theme, notification_settings, daily_schedule FROM preferences').all());

console.log('--- USER DATA TABLE ---');
console.table(db.prepare('SELECT user_id, streaks, completion_percentage, updated_at FROM user_data').all());
