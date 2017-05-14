INSERT INTO users (username, auth_id) 
VALUES ($1, $2) 
RETURNING username, auth_id;