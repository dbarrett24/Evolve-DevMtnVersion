INSERT INTO habits
(title, color, currentstreak, date_created, time_created, momentum, reminder_time, user_id)
VALUES ($1, $2, 0, $3, $4, 0, $5, 1)
RETURNING *;

