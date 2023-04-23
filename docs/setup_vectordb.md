<!-- toc -->

- [0. Setup VectorDB](#0-setup-vectordb)
- [1. Update VectorDB](#1-update-vectordb)

<!-- tocstop -->

## 0. Setup VectorDB and Schema

1. Define DB `provider` and `url` in `prisma/schema.prisma` file as follows:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

1. Setup `.env` file with the following variables:

```bash
DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>"
DIRECT_DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
```

**Notes:**

- Remember to replace the `<user>`, `<password>`, `<host>`, `<port>`, and `<database>` placeholders with the actual values.
- Notice that the `DATABASE_URL` is prefixed with `postgres://` and the `DIRECT_DATABASE_URL` is prefixed with `postgresql://`.
- (optional) Use percent encoding to escape special characters (if any) in the password.

1. Use Prisma Schema Language to define the data model in a schema file. The schema file is named `prisma/schema.prisma` by convention.
1. When the schema is in a relatively stable state, create the DB schema for the first time Run: `npx prisma migrate dev --name init` to create the database schema and generate Prisma Client.

## 1. Update VectorDB schema

1. Make changes to prototype and develop the Prisma schema file as necessary.
1. Run `npx prisma db push` to update the database schema and generate Prisma Client. This will generate Prisma Client but not record the schema change history in the database.
1. When the schema is in a relatively stable state, run `npx prisma migrate dev --name <migration-name>` to create a new migration and apply it to the database.
1. Run `npx prisma migrate dev --name <migration-name>` to create a new migration and apply it to the database.
1. Run `npx prisma generate` to generate Prisma Client.
1. (Optional) Run `npx prisma studio` to open the Prisma Studio GUI to view the data in the database.
