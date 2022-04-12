CREATE DATABASE cinemaapp;

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
  show_date DATE NOT NULL,
  movie_id uuid NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
  hallscheme_id uuid NOT NULL REFERENCES hallschemes(hallscheme_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    showtime_id uuid NOT NULL REFERENCES showtimes(showtime_id) ON DELETE CASCADE,
    booked_seats INTEGER[][] NOT NULL,
    start_date DATE,
    total INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id uuid PRIMARY KEY DEFAULT
	uuid_generate_v4(),
    reservation_id uuid NOT NULL REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    pmethod VARCHAR(32) NOT NULL,
    pdatetime TIMESTAMPTZ NOT NULL,
    transaction_id BIGINT
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
 VALUES ('Человек-паук: Нет пути домой','Действие фильма «Человек-паук: Нет пути домой» начинает своё развитие в тот момент, когда Мистерио удаётся выяснить истинную личность Человека-паука. С этого момента жизнь Питера Паркера становится невыносимой. Если ранее он мог успешно переключаться между своими амплуа, то сейчас это сделать невозможно. Переворачивается с ног на голову не только жизнь Человека-пауку, но и репутация. Понимая, что так жить невозможно, главный герой фильма «Человек-паук: Нет пути домой» принимает решение обратиться за помощью к своему давнему знакомому Стивену Стрэнджу. Питер Паркер надеется, что с помощью магии он сможет восстановить его анонимность. Стрэндж соглашается помочь.','https://www.themoviedb.org/t/p/original/VlHt27nCqOuTnuX6bku8QZapzO.jpg','https://www.themoviedb.org/t/p/original/gespPE81A2RYvMxl9XaVNvIgevS.jpg','148','Jon Wattsс','{"Боевик","Приключения","Фантастика","Фэнтези"}','2021-12-15 00:00:00-07','2022-01-01 00:00:00-07');
INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Матрица: Воскрешение','Продолжение истории, рассказанной в первом фильме "МАТРИЦА", воссоединяющее кинематографических картин Нео и Тринити, когда они отправляются обратно в Матрицу и еще глубже в кроличью нору. Новое захватывающее приключение с действием и эпическим масштабом, действие которого разворачивается в знакомом, но еще более провокационном мире, где реальность более субъективна, чем когда-либо, и все, что требуется, чтобы увидеть правду, - это освободить свой разум.','https://www.themoviedb.org/t/p/original/3NiiRAKt2L5bUuAvSOkv6Yn7u6T.jpg','https://www.themoviedb.org/t/p/original/gespPE81A2RYvMxl9XaVNvIgevS.jpg','148','Лана Вачовски','{"Боевик","Фантастика"}','2021-12-15 00:00:00-07','2022-01-01 00:00:00-07');
 INSERT INTO movies ( movie_title,
  movie_description,
  image_url,
  back_image_url,
   movie_duration,
    movie_director,
     movie_genre,
      release_date,
       end_date )
 VALUES ('Дом Gucci','Фамилия Гуччи звучала так сладко, так соблазнительно. Синоним роскоши, стиля, власти. Но она же была их проклятьем. Шокирующая история любви, предательства, падения и мести, которая привела к жестокому убийству в одной из самых знаменитых модных империй мира.','https://www.themoviedb.org/t/p/original/6VZF8JVNOgJX56WCapYaqcVQiAw.jpg','https://www.themoviedb.org/t/p/original/ivSzkIRjPx7HQ0Jt1PR6hf6mM9w.jpg','150','Ридли Скотт','{"Драма","Криминал","Триллер"}','2021-12-15 00:00:00-07','2022-01-01 00:00:00-07');
 

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


-- INSERT INTO movies ( movie_title,
--   movie_description,
--   image_url,
--   back_image_url,
--    movie_duration,
--     movie_director,
--      movie_genre,
--       release_date,
--        end_date )
--  VALUES ('Достать ножи','На следующее утро после празднования 85-летия известного автора криминальных романов Харлана Тромби виновника торжества находят мёртвым. Налицо - явное самоубийство, но полиция по протоколу опрашивает всех присутствующих в особняке членов семьи, хотя, в этом деле больше заинтересован частный детектив Бенуа Блан. Тем же утром он получил конверт с наличными от неизвестного и заказ на расследование смерти Харлана. Не нужно быть опытным следователем, чтобы понять, что все приукрашивают свои отношения с почившим главой семейства, но Блану достаётся настоящий подарок - медсестра покойного, которая физически не выносит ложь.','https://image.tmdb.org/t/p/original/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg','https://image.tmdb.org/t/p/original/g1eZwt1uXQupUY1WpU8iQXkcaK6.jpg','130','Райан Джонсон','{"Детектив","Драма","Комедия","Криминал"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
-- INSERT INTO movies ( movie_title,
--   movie_description,
--   image_url,
--   back_image_url,
--    movie_duration,
--     movie_director,
--      movie_genre,
--       release_date,
--        end_date )
--  VALUES ('Ford против Ferrari','В начале 1960-х Генри Форд II принимает решение улучшить имидж компании и сменить курс на производство более модных автомобилей. После неудавшейся попытки купить практически банкрота Ferrari американцы решают бросить вызов итальянским конкурентам на трассе и выиграть престижную гонку 24 часа Ле-Мана. Чтобы создать подходящую машину, компания нанимает автоконструктора Кэррола Шэлби, а тот отказывается работать без выдающегося, но, как считается, трудного в общении гонщика Кена Майлза. Вместе они принимаются за разработку впоследствии знаменитого спорткара Ford GT40.','https://image.tmdb.org/t/p/original/5ZQjqTi72MifO4G79nJ5niv0ioN.jpg','https://image.tmdb.org/t/p/original/qfY58nletpMcVNOrCQg95T3kUwh.jpg','152','Джеймс Мэнголд','{"Биография","Спорт","Драма","Боевик"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');
-- INSERT INTO movies ( movie_title,
--   movie_description,
--   image_url,
--   back_image_url,
--    movie_duration,
--     movie_director,
--      movie_genre,
--       release_date,
--        end_date )
--  VALUES ('Кролик Джоджо','Гитлеровская Германия. У немного стеснительного 10-летнего Йоханнеса Бетслера, члена Гитлерюгенда и большого поклонника официального курса, есть лучший друг - воображаемый Адольф Гитлер. Хоть мальчик сам ещё никак не научится завязывать шнурки, он отправляется на выходные в военно-патриотический лагерь, где, не решившись убить кролика, получает прозвище Кролик Джоджо. А после, пытаясь доказать окружающим свою смелость, парень случайно подрывается на гранате. Но вскоре у Джоджо появится более веская причина для волнения, чем собственные шрамы, - он выясняет, что мама прячет в доме еврейскую девушку.','https://image.tmdb.org/t/p/original/agoBZfL1q5G79SD0npArSlJn8BH.jpg','https://image.tmdb.org/t/p/original/8CX2kCBV9x5ASTQ3ipLToz6TtCa.jpg','108','Тайка Вайтити','{"Драма", "Комедия", "Военный", "История"}','2020-12-01 19:10:25-07','2020-12-05 19:10:25-07');


--  INSERT INTO hallschemes (
--   hall_name,
--   seats )
--  VALUES ('Первый', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{4,4,3,3,3,3,3,3,4,4}}');
-- INSERT INTO hallschemes (
--   hall_name,
--   seats )
--  VALUES ('Второй', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');

--  INSERT INTO hallschemes (
--   hall_name,
--   seats )
--  VALUES ('Третий', '{{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3},{3,3,3,3,3,3,3,3,3,3}}');

-- select startat from showtimes where movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c';
-- SELECT ARRAY[startat] FROM showtimes  WHERE movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c';
-- select array_to_string(ARRAY(select DISTINCT startat from showtimes WHERE movie_id='f8facf7c-ec1f-4c59-b818-f547d3830e9c' ORDER BY startat), ',');