UPDATE frequency
SET monday = $1, tuesday = $2, wednesday = $3, thursday = $4, friday = $5, saturday = $6, sunday = $7
WHERE habit_id = $8;