import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = await MongoClient.connect(uri);
  return client;
}

// GET all todos
export async function GET() {
  const client = await connectToDatabase();
  const db = client.db();
  const todos = await db.collection("todos").find().toArray();
  client.close();

  return new Response(JSON.stringify(todos), { status: 200 });
}

// POST a new todo
export async function POST(req) {
  const data = await req.json();
  const client = await connectToDatabase();
  const db = client.db();

  const result = await db.collection("todos").insertOne(data);
  client.close();

  return new Response(JSON.stringify(result.insertedId), { status: 201 });
}
