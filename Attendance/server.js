const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const mongoDbName = process.env.MONGO_DB || 'attendance-app';

let db;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

function studentsCollection() {
  return db.collection('students');
}

function attendanceCollection() {
  return db.collection('attendance');
}

app.get('/api/students', async (req, res) => {
  try {
    const students = await studentsCollection().find({}).sort({ id: 1 }).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load students' });
  }
});

app.post('/api/students', async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'id and name are required' });
  }

  try {
    const existing = await studentsCollection().findOne({ id });
    if (existing) {
      return res.status(400).json({ error: 'Student id already exists' });
    }

    await studentsCollection().insertOne({ id, name });
    const students = await studentsCollection().find({}).sort({ id: 1 }).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add student' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  try {
    const result = await studentsCollection().findOneAndUpdate(
      { id: studentId },
      { $set: { name } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const students = await studentsCollection().find({}).sort({ id: 1 }).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update student' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    await studentsCollection().deleteOne({ id: studentId });
    await attendanceCollection().updateMany(
      {},
      { $unset: { [`statusById.${studentId}`]: '' } }
    );
    const students = await studentsCollection().find({}).sort({ id: 1 }).toArray();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete student' });
  }
});

app.get('/api/attendance', async (req, res) => {
  try {
    const attendance = await attendanceCollection().find({}).sort({ date: -1 }).toArray();
    res.json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load attendance' });
  }
});

app.post('/api/attendance', async (req, res) => {
  const { date, statusById } = req.body;
  if (!date || !statusById) {
    return res.status(400).json({ error: 'date and statusById are required' });
  }

  try {
    await attendanceCollection().replaceOne(
      { date },
      { date, statusById },
      { upsert: true }
    );
    const attendance = await attendanceCollection().find({}).sort({ date: -1 }).toArray();
    res.json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to save attendance' });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

async function start() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(mongoDbName);
    console.log(`Connected to MongoDB at ${mongoUri}, database ${mongoDbName}`);
    app.listen(port, () => {
      console.log(`Attendance app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

start();
