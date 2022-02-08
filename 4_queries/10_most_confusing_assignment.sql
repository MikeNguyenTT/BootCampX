SELECT assignments.id, name, day, chapter, count(assistance_requests.*) as total_request
FROM assignments
JOIN assistance_requests ON assistance_requests.assignment_id = assignments.id
GROUP BY assignments.id
ORDER BY total_request DESC;
