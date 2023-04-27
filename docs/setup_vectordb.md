# Setting up a Vector Database store using Prisma and PostgreSQL

[Prisma](https://prisma.io) is for ORM and PostgreSQL is for the database. Prisma is used to define the database schema and auto generate the Prisma Client. Prisma Client is used to interact with the database.

<!-- toc -->

- [0. Setup VectorDB using Prisma](#0-setup-vectordb-using-prisma)
- [0. Setup Schema](#0-setup-schema)
- [1. Update VectorDB schema](#1-update-vectordb-schema)
- [Issues](#issues)
- [Notes and References](#notes-and-references)

<!-- tocstop -->

## 0. Setup VectorDB using Prisma

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
DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>?pgbouncer=true"
DIRECT_DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
```

**Notes:**

- Remember to replace the `<user>`, `<password>`, `<host>`, `<port>`, and `<database>` placeholders with the actual values.
- Notice that the `DATABASE_URL` is prefixed with `postgres://` and the `DIRECT_DATABASE_URL` is prefixed with `postgresql://`.
- (optional) Use percent encoding to escape special characters (if any) in the password.

## 0. Setup Schema

1. Use Prisma Schema Language to define the data model in a schema file. The schema file is named `prisma/schema.prisma` by convention.
1. When the schema is in a relatively stable state, create the DB schema for the first time Run: `npx prisma migrate dev --name init` to create the database schema and generate Prisma Client.
1. Update `schema.prisma` to include `postgresqlExtensions` `previewFeatures`

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}
```

1. (optional) Pull the extensions list from the database: `npx prisma db pull`
1. Add the `pgvector` extension to the `datasource` block in `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
  extensions = [pgvector(map: "vector", schema: "extensions")]
}
```

> NOTE: The `map` and `schema` values are optional. The values `vector` and `extensions` respectively work when using [Supabase](https://supabase.com).

## 1. Update VectorDB schema

1. Make changes to prototype and develop the Prisma schema file as necessary.
1. Run `npx prisma db push` to update the database schema and generate Prisma Client. This will generate Prisma Client but not record the schema change history in the database.
1. When the schema is in a relatively stable state, run `npx prisma migrate dev --name <migration-name>` to create a new migration and apply it to the database.
1. Run `npx prisma migrate dev --name <migration-name>` to create a new migration and apply it to the database.
1. Run `npx prisma generate` to generate Prisma Client.
1. (Optional) Run `npx prisma studio` to open the Prisma Studio GUI to view the data in the database.

## Issues

1. Composite types are ignored by Prisma. Prisma only supports composite types for MongoDB.

The following simple model is not feasible with Prisma:

```prisma
model File {
  id        Int      @id @default(autoincrement())
  name      String
  chunks Embedding[]  // Composite type. Not supported by Prisma.
}

model Embedding{
  id     Int    @id @default(autoincrement())
  embedding Unsupported("vector")
}
```

The generated Prisma Client will not include the `chunks` field in the `File` model.

The generated `migrations.sql` looks like this:

```sql
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embedding" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector,

    CONSTRAINT "TextEmbedding_pkey" PRIMARY KEY ("id")
);
```

** Resolution: **

1. Generate the `migrations.sql` file using:

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

1. (optional) Update `prisma/migrations/0_init/migration.sql` to create the `chunks` table and add the `chunks` field to the `File` table.
1. Update `prisma/migrations/0_init/migration.sql` to set the dimensions for the `vector` field type :

````sql
...
    "meanEmbedding" vector(1536),
```

1. Update `prisma/migrations/0_init/migration.sql` to grant necessary permissions to the `public` schema. This is required since we are going to reset the database.

```sql
-- Setup permissions (manual step)
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;
````

See [prisma/migrations/0_init/migration.sql](prisma/migrations/0_init/migration.sql) for the complete migration script.

1. Reset and update the database using: `npx prisma migrate reset`

Related issues/feature-requests [Reuse collections of fields inside models](https://github.com/prisma/prisma/issues/2371) and, [Support for native DB composite types](https://github.com/prisma/prisma/issues/4263) has been open since 2020.

## Notes and references

- Use Baselining to avoid resetting the database in production. [See Baselining docs](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/baselining#baselining-a-database)
  For example, to baseline the database with the current schema, you can run:
  ```prisma
  npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
  ```
- See [Troubleshooting section](https://supabase.com/docs/guides/integrations/prisma#troubleshooting) for using Prisma with (Supabase) Auth, Row Level Security, and extensions.
