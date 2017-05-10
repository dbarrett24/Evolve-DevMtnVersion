UPDATE habits
SET title = $1, color = $2, reminder_time = $3
WHERE id = $4;
