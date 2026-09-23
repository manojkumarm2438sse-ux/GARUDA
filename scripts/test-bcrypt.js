const bcrypt = require('./bcrypt.js');
const hash = bcrypt.hashSync('garuda2027', 10);
console.log('Bcrypt hash:', hash);
console.log('Match test 1 (correct):', bcrypt.compareSync('garuda2027', hash));
console.log('Match test 2 (wrong):', bcrypt.compareSync('wrongpass', hash));
