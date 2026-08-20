import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const classes = pgTable(
  "classes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tingkat: varchar("tingkat", { length: 10 }).notNull(), // X, XI, XII
    namaKelas: varchar("nama_kelas", { length: 10 }).notNull(), // A, B, C, D
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("tingkat_nama_kelas_idx").on(table.tingkat, table.namaKelas),
  ],
);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  nama: varchar("nama", { length: 100 }).notNull(),
  role: varchar("role", { length: 10 }).notNull(),
  nipNik: varchar("nip_nik", { length: 50 }).notNull().unique(), // Unique NIP/NIK
  email: varchar("email", { length: 100 }), // Optional
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  classId: uuid("class_id").references(() => classes.id, {
    onDelete: "set null",
  }), // Optional, hanya untuk siswa
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(), // Tanggal pendaftaran
});

// export const usersRelations = relations(users, ({ one, many }) => ({
//   class: one(classes, {
//     fields: [users.classId],
//     references: [classes.id],
//   }),
//   tasksCreated: many(tasks), // sebagai guru
//   submissions: many(submissions), // sebagai siswa (ketua)
//   submissionMemberships: many(submissionMembers), // sebagai anggota tim
// }));

// // ============================================================
// // TASKS
// // ============================================================

// export const tasks = pgTable("tasks", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   guruId: uuid("guru_id")
//     .references(() => users.id)
//     .notNull(),
//   classId: uuid("class_id")
//     .references(() => classes.id)
//     .notNull(),
//   description: text("description").notNull(), // Deskripsi tugas
//   startDate: timestamp("start_date", { withTimezone: true }).notNull(), // Tanggal & waktu mulai
//   endDate: timestamp("end_date", { withTimezone: true }).notNull(), // Tanggal & waktu pengumpulan
//   attachmentUrl: text("attachment_url"), // Link file opsional
//   isTeamTask: boolean("is_team_task").default(false).notNull(), // Flag tugas kelompok
//   maxTeamMembers: integer("max_team_members"), // Maksimal anggota per tim (opsional)
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });

// export const tasksRelations = relations(tasks, ({ one, many }) => ({
//   guru: one(users, {
//     fields: [tasks.guruId],
//     references: [users.id],
//   }),
//   class: one(classes, {
//     fields: [tasks.classId],
//     references: [classes.id],
//   }),
//   submissions: many(submissions),
// }));

// // ============================================================
// // SUBMISSIONS
// // ============================================================

// export const submissions = pgTable("submissions", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   taskId: uuid("task_id")
//     .references(() => tasks.id)
//     .notNull(),
//   userId: uuid("user_id") // Siswa / ketua tim (Siswa Leader)
//     .references(() => users.id)
//     .notNull(),
//   submitUrl: text("submit_url").notNull(), // URL hasil tugas (Drive/GitHub)
//   notes: text("notes"), // Catatan tambahan (opsional)
//   submittedAt: timestamp("submitted_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(), // Waktu pengumpulan
// });

// export const submissionsRelations = relations(
//   submissions,
//   ({ one, many }) => ({
//     task: one(tasks, {
//       fields: [submissions.taskId],
//       references: [tasks.id],
//     }),
//     user: one(users, {
//       fields: [submissions.userId],
//       references: [users.id],
//     }),
//     members: many(submissionMembers),
//   })
// );

// // ============================================================
// // SUBMISSION_MEMBERS
// // ============================================================

// export const submissionMembers = pgTable("submission_members", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   submissionId: uuid("submission_id")
//     .references(() => submissions.id)
//     .notNull(),
//   userId: uuid("user_id") // Siswa anggota tim
//     .references(() => users.id)
//     .notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(), // Tanggal penambahan
// });

// export const submissionMembersRelations = relations(
//   submissionMembers,
//   ({ one }) => ({
//     submission: one(submissions, {
//       fields: [submissionMembers.submissionId],
//       references: [submissions.id],
//     }),
//     user: one(users, {
//       fields: [submissionMembers.userId],
//       references: [users.id],
//     }),
//   })
// );
