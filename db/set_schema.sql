
-- users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_address VARCHAR(255),
    mailing_address VARCHAR(255),
    phone_number VARCHAR(255),
    profile_picture VARCHAR(255),
    username VARCHAR(255),
    auth_id VARCHAR(255),
    user_id VARCHAR(255)
);

-- habits
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    color VARCHAR(255),
    currentStreak VARCHAR(255),
    date_created DATETIME,
    frequency VARCHAR(255),
    momentum INTEGER,
    reminder_time TIME
);

-- days_completed
CREATE TABLE days_completed (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER REFERENCES habits(id),
    user_id INTEGER REFERENCES users(id),
    date_object DATETIME,
    journal_entry VARCHAR(255)
);
-- streaks
CREATE TABLE streaks (
    id SERIAL PRIMARY KEY,
    streak_start_date DATETIME,
    streak_end_date DATETIME,
    habit_id INTEGER REFERENCES habits(id),
    user_id INTEGER REFERENCES users(id)
);
-- frequency
CREATE TABLE frequency (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER REFERENCES habits(id),
    monday BOOLEAN,
    tuesday BOOLEAN,
    wednesday BOOLEAN,
    thursday BOOLEAN,
    friday BOOLEAN,
    saturday BOOLEAN,
    sunday BOOLEAN
);