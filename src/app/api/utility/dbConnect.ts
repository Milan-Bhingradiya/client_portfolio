// lib/dbConnect.ts
// this one i use....
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
// console.log(MONGODB_URI)
if (!MONGODB_URI) {
    
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null,
    promise: Promise<mongoose.Mongoose> | null,
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
  }
  cached.conn = await cached.promise;
  console.log(cached.conn.connection.host)
  return cached.conn;
}

export default dbConnect;
