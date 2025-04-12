// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text, blob } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `datacosite_${name}`);

export const admins = createTable(
  "admins",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email", { length: 256 }).notNull(),
    password: text("password", { length: 256 }).notNull(),
    name: text("name", { length: 256 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  }
);

export const users = createTable(
  "users",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email", { length: 256 }).notNull(),
    password: text("password", { length: 256 }).notNull(),
    affiliationId: int("affiliation_id", { mode: "number" }).notNull(),
    approved: int("approved", { mode: "boolean" }).default(false),
    approvedBy: int("approved_by", { mode: "number" }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  }
);

export const affiliations = createTable(
  "affiliations",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).notNull(),
    logoBlob: blob("logo_blob", { mode: 'buffer' }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  }
);

export const collectedData = createTable(
  "collected_data",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    adminId: int("admin_id", { mode: "number" }).notNull(),
    value: text("value", { length: 256 }).notNull(),
    type: int("type", { mode: "number" }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  }
);

export const collectedDataTypes = createTable(
  "collected_data_types",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 256 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  }
);