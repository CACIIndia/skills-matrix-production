// pages/api/read.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('Testing');
      const documents = await collection.find({}).toArray();
      res.status(200).json({ documents });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch documents', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
