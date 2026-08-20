import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { classes, users } from "./db/schema";

// const db = getDb();

const app = new Hono();
app.use("*", cors());

function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql);
}

app.get("/api/classes", async (c) => {
  const db = getDb();
  try {
    const result = await db.select().from(classes);
    return c.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error fetching classes:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch classes",
      },
      500,
    );
  }
});
app.post("/api/auth/register", async (c) => {
  const db = getDb();
  const { nama, role, nipNik, email, password, classId } = await c.req.json();

  try {
    const newUser = await db
      .insert(users)
      .values({
        nama,
        role,
        nipNik,
        email: email || null,
        passwordHash: password,
        classId: role === "guru" ? null : classId,
      })
      .returning();

    return c.json({ success: true, data: newUser[0] }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});
app.post("/api/auth/login", async (c) => {
  const db = getDb();
  const { nipNik, password } = await c.req.json();

  try {
    const foundUsers = await db
      .select()
      .from(users)
      .where(and(eq(users.nipNik, nipNik), eq(users.passwordHash, password)));

    if (foundUsers.length === 0) {
      return c.json(
        { success: false, message: "NIP/NIK atau password salah" },
        401,
      );
    }

    return c.json({ success: true, data: foundUsers[0] }, 200);
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});
export default app;
