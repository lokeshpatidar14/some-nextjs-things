import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = await MongoClient.connect(uri);
  return client;
}

// PUT (Update a todo by ID)
export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  try {
    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("todos").updateOne(
      { _id: new ObjectId(id) },
      { $set: { text: data.text, completed: data.completed } }
    );

    client.close();
    return new Response(JSON.stringify({ message: "Todo updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


// DELETE (Delete a todo by ID)
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("todos").deleteOne({ _id: new ObjectId(id) });

    client.close();
    return new Response(JSON.stringify({ message: "Todo deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
