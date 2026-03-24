# solid-api

A REST API built with Fastify, TypeScript, Prisma, PostgreSQL, JWT authentication, and RBAC.

This project was created to practice concepts such as SOLID, design patterns, authentication flows, Docker-based local infrastructure, and end-to-end testing against a real database.

## Tech Stack

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT + cookies
- Vitest
- Docker

## Features

- User registration and authentication
- JWT access token and refresh token flow
- Authenticated profile endpoint
- Gym search and nearby gym listing
- Gym creation restricted to admin users
- Check-in creation, history, and metrics
- Check-in validation restricted to admin users

## API Overview

### Public routes

- `POST /users` - register a new user
- `POST /session` - authenticate a user
- `PATCH /token/refresh` - refresh the access token

### Authenticated routes

- `GET /me` - get the current user profile
- `GET /gyms/search` - search gyms
- `GET /gyms/nearby` - list nearby gyms
- `POST /gyms` - create a gym, admin only
- `GET /check-ins/history` - get check-in history
- `GET /check-ins/metrics` - get check-in metrics
- `POST /gyms/:gymId/check-ins` - create a check-in
- `PATCH /check-ins/:checkInId/validate` - validate a check-in, admin only

## Prerequisites

Before running the project, make sure you have:

- Node.js 20 or newer
- npm
- Docker and Docker Compose

## Environment Variables

Create a `.env` file in the project root.

You can use `.env.example` as a reference:

```env
NODE_ENV=dev
PORT=3333
JWT_SECRET=your-secret-here
DATABASE_URL="postgresql://docker:docker@localhost:5432/ignitenode03?schema=public"
```

For end-to-end tests, create a separate `.env.test` file:

```env
NODE_ENV=test
PORT=3333
JWT_SECRET=your-test-secret
DATABASE_URL="postgresql://docker:docker@localhost:5433/apisolid_test?schema=public"
```

Important:

- `.env` is used for local development and the main database
- `.env.test` is used by the e2e test suite
- The e2e flow resets the test database with `prisma migrate reset --force`, so never point `.env.test` to a development or production database

## Running the Application Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development database

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` using `docker-compose.yml`.

### 3. Create your `.env`

Use the example above or copy `.env.example` and fill in the values.

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Run the database migrations

```bash
npx prisma migrate deploy
```

If you are actively changing the schema during development, use:

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3333
```

## Production Build

Build the project:

```bash
npm run build
```

Start the compiled application:

```bash
npm run start
```

## Running Tests

### Unit tests

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run with coverage:

```bash
npm run test:coverage
```

Open the Vitest UI:

```bash
npm run test:ui
```

### End-to-end tests

The e2e tests use a dedicated PostgreSQL database and a separate Docker Compose file.

### 1. Create `.env.test`

Use the example shown earlier in this README.

### 2. Start the test database

```bash
docker compose -f dokcer-compose.test.yml up -d
```

Note:

- The file name is currently `dokcer-compose.test.yml` in this repository
- The test database runs on port `5433`

### 3. Run the e2e tests

```bash
npm run test:e2e
```

Run e2e tests in watch mode:

```bash
npm run test:e2e:watch
```

### 4. Stop the test database when you are done

```bash
docker compose -f dokcer-compose.test.yml down
```

## Useful Prisma Commands

Generate the Prisma client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

Apply existing migrations:

```bash
npx prisma migrate deploy
```

Create and apply a new migration during development:

```bash
npx prisma migrate dev
```

## Project Scripts

- `npm run dev` - start the app in development mode
- `npm run build` - build the application
- `npm run start` - run the compiled build
- `npm run lint` - run ESLint with fix
- `npm run test` - run unit tests
- `npm run test:watch` - run tests in watch mode
- `npm run test:coverage` - run tests with coverage
- `npm run test:ui` - open the Vitest UI
- `npm run test:e2e` - run e2e tests
- `npm run test:e2e:watch` - run e2e tests in watch mode

## Database Models

The project currently uses these main models:

- `User`
- `Gym`
- `CheckIn`

The `User` model also includes a `role` field with:

- `ADMIN`
- `MEMBER`

## CI Notes

The CI workflows provide environment variables directly in GitHub Actions so Prisma commands can run without depending on a committed `.env` file.

## License

This project is licensed under the ISC license.
