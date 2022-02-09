const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2]}'
ORDER BY teachers.name;
`;

console.log(queryString);
pool.query(queryString)
.then(res => {
  res.rows.forEach(record => {
    console.log(`${record.cohort}: ${record.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));