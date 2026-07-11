# Character Management Application

A full-stack character browser built with NestJS, Prisma, GraphQL,
Next.js, React Query, GraphQL Code Generator, and nuqs.

## Live Demo

Deployed on Vercel: https://character-directory-web.vercel.app

## Prerequisites

-   Node.js 20 or newer
-   npm 10 or newer

## Quick start

1.  Install dependencies:

``` bash
npm install
```

## Database Configuration

This project does **not** include a database connection for security
reasons.

Create your own PostgreSQL database using **Supabase** (recommended),
Neon, Railway, or a local PostgreSQL instance.

### Using Supabase

1.  Create a new Supabase project.
2.  Open **Project Settings → Database**.
3.  Copy your PostgreSQL connection string.
4.  Open `apps/api/.env`.
5.  Replace `DATABASE_URL` with your own connection string.

Example:

``` env
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres
```

Then initialize the database:

``` bash
npm run setup
```

This command will: - Generate the Prisma Client - Run database
migrations - Seed the database with the initial character data

> **Security Note**
>
> Database credentials are **not** included in this repository. Never
> commit your `.env` file or any secrets to GitHub. Only commit
> `.env.example`.

## Start the application

``` bash
npm run dev
```

Open http://localhost:3000.

GraphQL Sandbox: http://localhost:4000/graphql

## Scripts

  -----------------------------------------------------------------------
  Command                             Purpose
  ----------------------------------- -----------------------------------
  `npm run dev`                       Run the API and web app together

  `npm run build`                     Create production builds for both
                                      apps

  `npm run setup`                     Generate Prisma Client, migrate,
                                      and seed

  `npm run db:seed`                   Replace all characters with the
                                      seed data

  `npm run codegen`                   Regenerate typed GraphQL operations
                                      and React Query hooks (API must be
                                      running)
  -----------------------------------------------------------------------

## GraphQL Query Example


``` graphql
query {
  characters(filters: { status: ALIVE, search: "scientist" }) {
    id
    name
    status
    gender
    description
    image
  }
}
```

All filters are passed to Prisma in the NestJS resolver. The web app
does not filter a client-side character list.
