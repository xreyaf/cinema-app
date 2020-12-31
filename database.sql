--CREATE DATABASE cinemaapp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS showtimes CASCADE;
DROP TABLE IF EXISTS hallschemes CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;

CREATE TABLE IF NOT EXISTS users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies
(
  movie_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
  movie_title VARCHAR(255) NOT NULL,
  movie_description TEXT NOT NULL, 
  image_url VARCHAR(255) NOT NULL,
  back_image_url VARCHAR(255) NOT NULL,
  movie_duration VARCHAR(255) NOT NULL,
  movie_director VARCHAR(100) NOT NULL,
  movie_genre TEXT[] NOT NULL,
  release_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS hallschemes (
    hallscheme_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    hall_name VARCHAR(100) NOT NULL,
    seats INTEGER[][] NOT NULL
);

CREATE TABLE IF NOT EXISTS showtimes
(
  showtime_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
  ticket_price INTEGER NOT NULL,
  start_at VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL ,
  movie_id uuid NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
  hallscheme_id uuid NOT NULL REFERENCES hallschemes(hallscheme_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    showtime_id uuid NOT NULL REFERENCES showtimes(showtime_id) ON DELETE CASCADE,
    booked_seats INTEGER[][] NOT NULL,
    start_date DATE NOT NULL,
    total INTEGER NOT NULL
);

INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Джокер','Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.','https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg','https://image.tmdb.org/t/p/original/rlay2M5QYvi6igbGcFjq8jxeusY.jpg','122','Тодд Филлипс','{"Триллер","Драмма","Криминал"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Джентльмены','Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира - партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.','https://image.tmdb.org/t/p/original/hClLP88yMIuhslwSVxtYrvWmxfp.jpg','https://image.tmdb.org/t/p/original/9Qfawg9WT3cSbBXQgDRuWbYS9lj.jpg','113','Гай Ричи','{"Криминал","Комедия","Боевик"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Паразиты','Обычное корейское семейство Кимов жизнь не балует. Приходится жить в сыром грязном полуподвале, воровать интернет у соседей и перебиваться случайными подработками. Однажды друг сына семейства, уезжая на стажировку за границу, предлагает тому заменить его и поработать репетитором у старшеклассницы в богатой семье Пак. Подделав диплом о высшем образовании, парень отправляется в шикарный дизайнерский особняк и производит на хозяйку дома хорошее впечатление. Тут же ему в голову приходит необычный план по трудоустройству сестры.','https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg','https://image.tmdb.org/t/p/original/hAtRKAi24kw4wyGB2IyvmFdVGHC.jpg','131','Пон Джун-хо','{"Триллер","Драма","Комедия"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Достать ножи','На следующее утро после празднования 85-летия известного автора криминальных романов Харлана Тромби виновника торжества находят мёртвым. Налицо - явное самоубийство, но полиция по протоколу опрашивает всех присутствующих в особняке членов семьи, хотя, в этом деле больше заинтересован частный детектив Бенуа Блан. Тем же утром он получил конверт с наличными от неизвестного и заказ на расследование смерти Харлана. Не нужно быть опытным следователем, чтобы понять, что все приукрашивают свои отношения с почившим главой семейства, но Блану достаётся настоящий подарок - медсестра покойного, которая физически не выносит ложь.','https://image.tmdb.org/t/p/original/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg','https://image.tmdb.org/t/p/original/g1eZwt1uXQupUY1WpU8iQXkcaK6.jpg','130','Райан Джонсон','{"Детектив","Драма","Комедия","Криминал"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Ford против Ferrari','В начале 1960-х Генри Форд II принимает решение улучшить имидж компании и сменить курс на производство более модных автомобилей. После неудавшейся попытки купить практически банкрота Ferrari американцы решают бросить вызов итальянским конкурентам на трассе и выиграть престижную гонку 24 часа Ле-Мана. Чтобы создать подходящую машину, компания нанимает автоконструктора Кэррола Шэлби, а тот отказывается работать без выдающегося, но, как считается, трудного в общении гонщика Кена Майлза. Вместе они принимаются за разработку впоследствии знаменитого спорткара Ford GT40.','https://image.tmdb.org/t/p/original/5ZQjqTi72MifO4G79nJ5niv0ioN.jpg','https://image.tmdb.org/t/p/original/qfY58nletpMcVNOrCQg95T3kUwh.jpg','152','Джеймс Мэнголд','{"Биография","Спорт","Драма","Боевик"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Кролик Джоджо','Гитлеровская Германия. У немного стеснительного 10-летнего Йоханнеса Бетслера, члена Гитлерюгенда и большого поклонника официального курса, есть лучший друг - воображаемый Адольф Гитлер. Хоть мальчик сам ещё никак не научится завязывать шнурки, он отправляется на выходные в военно-патриотический лагерь, где, не решившись убить кролика, получает прозвище Кролик Джоджо. А после, пытаясь доказать окружающим свою смелость, парень случайно подрывается на гранате. Но вскоре у Джоджо появится более веская причина для волнения, чем собственные шрамы, - он выясняет, что мама прячет в доме еврейскую девушку.','https://image.tmdb.org/t/p/original/agoBZfL1q5G79SD0npArSlJn8BH.jpg','https://image.tmdb.org/t/p/original/8CX2kCBV9x5ASTQ3ipLToz6TtCa.jpg','108','Тайка Вайтити','{"Драма", "Комедия", "Военный", "История"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');

INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Первый', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{4,4,3,3,3,3,3,3,4,4}}');
INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Второй', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');

 INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Третий', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');
 INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Первый', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{4,4,3,3,3,3,3,3,4,4}}');
INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Второй', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');

 INSERT INTO hallschemes (
  hall_name,
  seats )
 VALUES ('Третий', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');

-- select startat from showtimes where movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c';
-- SELECT ARRAY[startat] FROM showtimes  WHERE movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c';
-- select array_to_string(ARRAY(select DISTINCT startat from showtimes WHERE movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c' ORDER BY startat), ',');