// POST
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://lpatidar00:iZWLhfRhipfGuFqR@cluster0.q5jft.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne({ data });

    console.log(result);
    client.close();
    res.status(201).json({ message: "Data Inserted" });
  }
}
export default handler;
