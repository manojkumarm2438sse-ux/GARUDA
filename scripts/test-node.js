const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');

console.log('Testing Node.js v' + process.version);
const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT,
    target_goal TEXT,
    created_at TEXT
  );
`);
const stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)');
stmt.run('usr-1', 'Manoj Cadet', 'manoj@garuda.in', 'hash123', 'Indian Army Officer & UPSC', new Date().toISOString());
const rows = db.prepare('SELECT * FROM users').all();
console.log('DB SUCCESS:', rows);
