<!-- toc -->

- [0. Setup VectorDB](#0-setup-vectordb)
- [1. Update VectorDB](#1-update-vectordb)

<!-- tocstop -->

## 0. Setup VectorDB

1. Define DB `provider` and `url` in `prisma/schema.prisma` file as follows:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

1. Setup `.env` file with the following variables:

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
```

1. Use Prisma Schema Language to define the data model in a schema file. The schema file is named `prisma/schema.prisma` by convention.
1. To create the DB schema for the first time Run: `npx prisma migrate dev --name init` to create the database schema and generate Prisma Client.

## 1. Update VectorDB

1. Make changes to the Prisma schema file as necessary.
1. Run `npx prisma migrate dev --name <migration-name>` to create a new migration and apply it to the database.
1. Run `npx prisma generate` to generate Prisma Client.
1. (Optional) Run `npx prisma studio` to open the Prisma Studio GUI to view the data in the database.
