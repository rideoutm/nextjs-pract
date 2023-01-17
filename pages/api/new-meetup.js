// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "post") {
    const data = req.body;
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://nextjsstuff:eNDX7ZUyBp0gtf2t@cluster0.jfaag30.mongodb.net/test"
    );

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler;