DROP TABLE IF EXISTS users, habits, days_completed;

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
    date_created VARCHAR(255),
    frequency VARCHAR(255),
    momentum INTEGER,
    reminder_time VARCHAR(255)
);

-- days_completed
CREATE TABLE days_completed (
    habit_id INTEGER,
    user_id VARCHAR(255),
    date_object VARCHAR(255),
    journal_entry VARCHAR(255)
);