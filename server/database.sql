CREATE DATABASE cinemaapp;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS films;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE movies
(
  movie_id SERIAL PRIMARY KEY,
  movie_title VARCHAR(255) NOT NULL,
  movie_description TEXT NOT NULL, 
  image_url VARCHAR(255) NOT NULL,
  movie_duration VARCHAR(255) NOT NULL,
  movie_direction VARCHAR(100) NOT NULL,
  movie_genre VARCHAR(255) NOT NULL,
  releaseDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP NOT NULL
);

INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
   movie_duration,
    movie_direction,
     movie_genre,
      releaseDate,
       endDate )
 VALUES ('Джокер','Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.','https://i.imgur.com/bZ2JjjC.jpeg','122','Тодд Филлипс','Триллер,Драмма,Криминал','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
   movie_duration,
    movie_direction,
     movie_genre,
      releaseDate,
       endDate )
 VALUES ('Джентльмены','Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира - партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.','https://static.highsnobiety.com/thumbor/Q-vQbpHw9cK-8g1sJXs9kntWIW4=/1200x800/static.highsnobiety.com/wp-content/uploads/2020/01/24224831/the-gentlemen-movie-style-01.jpg','113','Гай Ричи','Криминал,Комедия,Боевик','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
   movie_duration,
    movie_direction,
     movie_genre,
      releaseDate,
       endDate )
 VALUES ('Паразиты','Обычное корейское семейство Кимов жизнь не балует. Приходится жить в сыром грязном полуподвале, воровать интернет у соседей и перебиваться случайными подработками. Однажды друг сына семейства, уезжая на стажировку за границу, предлагает тому заменить его и поработать репетитором у старшеклассницы в богатой семье Пак. Подделав диплом о высшем образовании, парень отправляется в шикарный дизайнерский особняк и производит на хозяйку дома хорошее впечатление. Тут же ему в голову приходит необычный план по трудоустройству сестры.','https://media.newyorker.com/photos/5da4a5c756dcd400082a63ba/master/w_2560%2Cc_limit/Brody-Parasite.jpg','131','Пон Джун-хо','Триллер,Драма,Комедия','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
   movie_duration,
    movie_direction,
     movie_genre,
      releaseDate,
       endDate )
 VALUES ('Достать ножи','На следующее утро после празднования 85-летия известного автора криминальных романов Харлана Тромби виновника торжества находят мёртвым. Налицо - явное самоубийство, но полиция по протоколу опрашивает всех присутствующих в особняке членов семьи, хотя, в этом деле больше заинтересован частный детектив Бенуа Блан. Тем же утром он получил конверт с наличными от неизвестного и заказ на расследование смерти Харлана. Не нужно быть опытным следователем, чтобы понять, что все приукрашивают свои отношения с почившим главой семейства, но Блану достаётся настоящий подарок - медсестра покойного, которая физически не выносит ложь.','https://image.tmdb.org/t/p/original/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg','13','Райан Джонсон','Детектив,Драма,Комедия,Криминал','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');




CREATE TABLE showtime
(
  follower_id SERIAL PRIMARY KEY,
  follower_user INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  following_user INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  followed_on VARCHAR(255) NOT NULL
);
