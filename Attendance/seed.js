const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB || 'attendance-app';
const seedFilePath = path.join(__dirname, 'data', 'attendance.json');

async function seed() {
  const raw = fs.readFileSync(seedFilePath, 'utf8');
  const { students = [], attendance = [] } = JSON.parse(raw);

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection('students').deleteMany({});
    if (students.length) {
      await db.collection('students').insertMany(students);
    }

    await db.collection('attendance').deleteMany({});
    if (attendance.length) {
      await db.collection('attendance').insertMany(attendance);
    }

    console.log(`Seeded ${students.length} students and ${attendance.length} attendance records into ${dbName}`);
  } catch (error) {
    console.error('Failed to seed MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
