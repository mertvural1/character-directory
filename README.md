# Character Management Application

A full-stack character browser built with NestJS, Prisma, GraphQL, Next.js, React Query, GraphQL Code Generator, and nuqs.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the API database:

   ```bash
   copy apps\\api\\.env.example apps\\api\\.env
   ```

   On macOS/Linux use `cp apps/api/.env.example apps/api/.env`.

3. Generate Prisma Client, apply the SQLite migration, and seed the database:

   ```bash
   npm run setup
   ```

4. Start both apps:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). The GraphQL sandbox is at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the API and web app together |
| `npm run build` | Create production builds for both apps |
| `npm run setup` | Generate Prisma Client, migrate, and seed |
| `npm run db:seed` | Replace all characters with the seed data |
| `npm run codegen` | Regenerate typed GraphQL operations and React Query hooks (API must be running) |

## GraphQL query example

```graphql
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

All filters are passed to Prisma in the NestJS resolver. The web app does not filter a client-side character list.

