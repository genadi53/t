import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `code-quest_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const games = mysqlTable(
  "game",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    hintsLeft: int("hintsLeft").default(0),
    isSplitAnswersUsed: boolean("isSplitAnswersUsed").default(false),
    isCallFriendUsed: boolean("isCallFriendUsed").default(false),
    isGetHelpUsed: boolean("isGetHelpUsed").default(false),
  },
  (game) => ({
    gameIdIdx: index("gameIdIdx").on(game.id),
  }),
);

export const gamesRelations = relations(games, ({ many, one }) => ({
  user: one(users),
  questions: many(questions),
  prompts: many(gamePrompts),
}));

export const gamePrompts = mysqlTable(
  "gamePrompt",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    gameId: varchar("gameId", { length: 255 }).notNull(),
    input: text("input").notNull(),
    response: text("responce").notNull(),
  },
  (gamePrompt) => ({
    gameIdIdx: index("gameIdIdx").on(gamePrompt.gameId),
  }),
);

export const gamePromptsRelations = relations(gamePrompts, ({ one }) => ({
  game: one(games),
}));

export const questions = mysqlTable(
  "question",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    gameId: varchar("gameId", { length: 255 }).notNull(),
    difficulty: varchar("difficulty", {
      length: 255,
      enum: ["easy", "intermediate", "hard"],
    })
      .notNull()
      .default("easy"),
    questionText: text("questionText").notNull(),
    explanation: text("explanation"),
  },
  (question) => ({
    gameIdIdx: index("gameIdIdx").on(question.gameId),
  }),
);

export const questionsRelations = relations(questions, ({ one, many }) => ({
  answers: many(answers),
  game: one(games),
}));

export const answers = mysqlTable(
  "answer",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    questionId: bigint("questionId", { mode: "number" }).notNull(),
    answerText: varchar("answerText", { length: 255 }).notNull(),
    isCorrect: boolean("isCorrect").notNull().default(false),
    isSelected: boolean("isSelected").default(false),
  },
  (answer) => ({
    questionIdIdx: index("questionIdIdx").on(answer.questionId),
  }),
);

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions),
}));
