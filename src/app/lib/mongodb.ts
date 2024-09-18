// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = "MONGODB_URI=mongodb+srv://manimam6:SkillsMatrix@001@cluster0.0s2bi.mongodb.net/mydatabase?retryWrites=true&w=majority"
;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid multiple connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new connection for each request
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
