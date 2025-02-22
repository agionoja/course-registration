// app/utils/db.server.ts
import mongoose from "mongoose";
import { env } from "~/env.config";

// Type definition for Mongoose connection
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection in development to prevent hot-reload issues
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseConnection;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const databaseUrl = env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("Please define the DATABASE_URL environment variable");
    }

    cached.promise = mongoose
      .connect(databaseUrl, {
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoose) => mongoose);

    // Enable debug mode in development
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// For serverless environments, clean up on exit
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
