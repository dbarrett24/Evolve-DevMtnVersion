INSERT INTO frequency
(habit_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
--returning * returns only the newly created rows from this function