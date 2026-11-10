# Laravel + React + MongoDB

Учебный проект: сайт из пяти страниц с новостями, аккаунтами, CRUD и лайками.
Всё работает в Docker.

## Стек

- **Backend:** Laravel 13, PHP 8.5, Laravel Sanctum (токены), `mongodb/laravel-mongodb`
- **Frontend:** React 19, TypeScript, Vite, React Router
- **База данных:** MongoDB (+ mongo-express для просмотра)
- **Окружение:** Docker Compose, [Task](https://taskfile.dev)

## Запуск

```bash
docker compose up -d --build
task backend:install      # composer install, .env, ключ приложения
task artisan -- db:seed   # демо-данные
```

| Сервис | Адрес |
|---|---|
| Сайт (React) | http://localhost:3000 |
| API (Laravel) | http://localhost:8000/api |
| mongo-express | http://localhost:8081 (`mongoexpressuser` / `mongoexpresspass`) |

Демо-пользователь после сидирования: `demo@example.com` / `password`.

## Команды Task

`task --list` покажет все. Основные:

| Команда | Действие |
|---|---|
| `task up` / `task down` | Запустить / остановить контейнеры |
| `task logs -- backend` | Логи сервиса |
| `task artisan -- <cmd>` | Artisan в контейнере |
| `task composer -- <cmd>` | Composer в контейнере |
| `task npm -- <cmd>` | npm во фронтенде |
| `task test` | Тесты API |
| `task lint` | Линтер фронтенда |
| `task shell:backend` / `shell:mongo` | Оболочка в контейнере |
| `task images:save` / `images:load` | Перенос Docker-образов без сети |

## API

| Метод | Путь | Доступ | Описание |
|---|---|---|---|
| POST | `/api/register` | все | Регистрация, возвращает токен |
| POST | `/api/login` | все | Вход, возвращает токен |
| POST | `/api/logout` | токен | Выход |
| GET | `/api/me` | токен | Текущий пользователь |
| GET | `/api/news` | все | Список новостей |
| GET | `/api/news/{id}` | все | Одна новость |
| POST | `/api/news` | токен | Создать новость |
| PUT | `/api/news/{id}` | автор | Изменить новость |
| DELETE | `/api/news/{id}` | автор | Удалить новость |
| POST | `/api/news/{id}/like` | токен | Поставить или снять лайк |

Токен передаётся заголовком `Authorization: Bearer <token>`.

## Структура

```
docker/       Dockerfile'ы и конфиг nginx
frontend/     React-приложение
laravel/      Laravel API
Taskfile.yml  Команды для работы
```

## Git Flow

- `develop` - основная ветка разработки
- `feature/*` - ветки задач, от `develop`
- слияние в `develop` через pull request
- коммиты в стиле Conventional Commits: `feat`, `fix`, `chore`, `style`, `test`, `docs`

## Тесты

```bash
task test
```

Тесты используют отдельную базу `laravel_testing` и не затрагивают рабочие данные.
