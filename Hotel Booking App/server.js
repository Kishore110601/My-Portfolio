import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'
import { hotels as hotelSeed } from './src/hotels.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const dbName = 'hotelBookingApp'

app.use(cors())
app.use(express.json())

const client = new MongoClient(mongoUri)

async function seedHotels(collection) {
  const count = await collection.countDocuments()
  if (count === 0) {
    await collection.insertMany(hotelSeed.map((hotel) => ({ ...hotel })))
    console.log('Seeded hotels collection')
  }
}

async function start() {
  await client.connect()
  const db = client.db(dbName)
  const hotelsCollection = db.collection('hotels')
  const bookingsCollection = db.collection('bookings')

  await seedHotels(hotelsCollection)

  app.get('/api/hotels', async (req, res) => {
    try {
      const hotels = await hotelsCollection.find().toArray()
      res.json(hotels)
    } catch (error) {
      console.error('Error fetching hotels:', error)
      res.status(500).json({ error: 'Unable to load hotels' })
    }
  })

  app.post('/api/bookings', async (req, res) => {
    const { hotelId, hotelName, price } = req.body

    if (hotelId == null || !hotelName || price == null) {
      return res.status(400).json({ error: 'Missing booking fields' })
    }

    try {
      const hotel = await hotelsCollection.findOne({ id: hotelId })
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' })
      }
      if (hotel.availableRooms <= 0) {
        return res.status(400).json({ error: 'No rooms available' })
      }

      await hotelsCollection.updateOne(
        { id: hotelId, availableRooms: { $gt: 0 } },
        { $inc: { availableRooms: -1 } }
      )

      const booking = {
        hotelId,
        hotelName,
        price,
        bookedAt: new Date(),
        status: 'confirmed'
      }

      await bookingsCollection.insertOne(booking)
      res.json({ booking })
    } catch (error) {
      console.error('Error creating booking:', error)
      res.status(500).json({ error: 'Unable to create booking' })
    }
  })

  const distPath = path.join(__dirname, 'dist')
  app.use(express.static(distPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
