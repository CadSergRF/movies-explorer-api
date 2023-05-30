## Проект Movies (бэкенд)

### Дипломный проект в рамках курса "Веб-разработчик" от Yandex Practicum. 
### Назначение прокта: Сервис для поиска фильмов с возможностью сохранения их в личном кабинете.
---
В проекте реализованы возможности:
- Регистрация / авторизация пользователя
- Изменение информации о пользователе
- Добавление / удаление фильма

---
### Запуск проекта

- Backend:
  - `npm lint` — запускает проверку линтером
  - `npm run start` — запускает сервер
  - `npm run dev` — запускает сервер с hot-reload

---
## Ссылки:
Backend: https://api.movies-csrf.nomoredomains.rocks
Публичный IP-адрес: 51.250.5.121
Репозиторий проекта: https://github.com/CadSergRF/movies-explorer-api

## Файлы и папки:
- controllers
  - movies.controller.js
    - getMovies - возвращает все сохранённые текущим  пользователем фильмы;
    - createMovie - создаёт фильм с параметрами: country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId;
    - deleteMovie - удаляет сохранённый фильм по id;
  - notFound.controller.js
    - urlNotFound - обработчик "ложного" URL;
  - users.controller.js
    - getUser - возвращает информацию о пользователе (email и имя);
    - changeUserInfo - изменение информации о пользователе (имя, email);
    - createUser - добавление(регистрация) нового пользователя;
    - login - авторизация пользователя;
    - logout - выход из приложения;
- errors - классы для ошибок API, расширяющие конструктор Error;
- middlewares
  - auth.middleware.js - проверка авторизован ли пользователь;
  - celebrateValidation.middleware.js - валидация запросов;
  - errors.middleware.js - централизованный обработчик ошибок;
  - logger.middleware.js - логирование запросов и ошибок;
  - rateLimiter.middleware.js - ограничение количества запросов к серверу;
- models
  - movie.model.js - схема карточки фильма;
  - user.model.js - схема карточки пользователя:
- routes
  - index.js ('/api') - централизованный роутер;
  - movies.router.js ('/movies')
    - get('/') - возвращает все сохранённые текущим  пользователем фильмы;
    - post('/') - создаёт фильм;
    - delete('/:id) - удаляет сохранённый фильм по id;
  - notFound.router.js ('*') - для обработки "ложных" URL;
  - signin.router.js post('/signin') - авторизация пользователя;
  - signout.router.js post('/signout') - выход из приложения;
  - signup.router.js post('signup') - регистрация пользователя;
  - users.router.js ('/users')
    - get('/me') - возвращает информацию о пользователе (email и имя);
    - patch('/me') - изменение информации о пользователе (имя, email);
- utils
  - constants.js - константы ошибок / адреса для cors;
  
## Основные технологии используемые в проекте
### Backend
- [Express](https://expressjs.com/ru/) - фреймворк веб-приложений Node.js;
- [MongoDB](https://www.mongodb.com/) - СУБД No-SQL;
- [Mongoose](https://mongoosejs.com/) - ORM для MongoDB;
- [NGinX](https://nginx.org/ru/) - web-сервер

---
## Автор

**Сергей Евдокимов**

- e-mail: [CadSergRF@yandex.ru](mailto:CadSergRF@yandex.ru)
- Telegram: [@CadSerg](https://t.me/CadSerg)
