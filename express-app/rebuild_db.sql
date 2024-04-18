DROP DATABASE IF EXISTS "blog-DB";
CREATE DATABASE "blog-DB";
\c "blog-DB";

DROP TABLE IF EXISTS userData;
CREATE TABLE userData
(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  user_name VARCHAR NOT NULL
);

DROP TABLE IF EXISTS post;
CREATE TABLE post
(
  post_id SERIAL PRIMARY KEY,
  post_title VARCHAR NOT NULL,
  posted_by VARCHAR,
  publish_date VARCHAR NOT NULL,
  post_blurb VARCHAR NOT NULL,
  post_category VARCHAR NOT NULL,
  img_address VARCHAR
);
--
---- Reset the table
--TRUNCATE post RESTART IDENTITY;
--
---- Insert data
---- Generating 20 rows for 'Articles'
--INSERT INTO post (post_title, posted_by, publish_date, post_blurb, post_category, img_address)
--SELECT
--  'Article ' || generate_series || ' Title',
--  'First_Name' || generate_series || ' Last_Name' || generate_series,
--  CURRENT_DATE,
--  'Blurb for article ' || generate_series,
--  'Articles',
--  'Address' || generate_series
--FROM generate_series(1, 20);
--
---- Generating 20 rows for 'Tutorials'
--INSERT INTO post (post_title, posted_by, publish_date, post_blurb, post_category, img_address)
--SELECT
--  'Tutorial ' || generate_series || ' Title',
--  'First_Name' || generate_series || ' Last_Name' || generate_series,
--  CURRENT_DATE,
--  'Blurb for tutorial ' || generate_series,
--  'Tutorials',
--  'Address' || generate_series
--FROM generate_series(1, 20);
--
---- Generating 20 rows for 'Rants'
--INSERT INTO post (post_title, posted_by, publish_date, post_blurb, post_category, img_address)
--SELECT
--  'Rant ' || generate_series || ' Title',
--  'First_Name' || generate_series || ' Last_Name' || generate_series,
--  CURRENT_DATE,
--  'Blurb for rant ' || generate_series,
--  'Rants',
--  'Address' || generate_series
--FROM generate_series(1, 20);