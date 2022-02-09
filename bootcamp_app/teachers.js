const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const values = [process.argv[2]];
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(record => {
    console.log(`${record.cohort}: ${record.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));