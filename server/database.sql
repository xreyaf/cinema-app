CREATE DATABASE cinemaapp;

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert fake users
INSERT INTO users (user_email,user_password) VALUES ('roma.polyakov.2000@gmail.com','sklfib617R1');
