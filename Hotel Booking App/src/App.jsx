import { useEffect, useMemo, useState } from 'react'
import { regionOptions } from './hotels'

const languages = [
  { value: 'ta', label: 'தமிழ்' },
  { value: 'en', label: 'English' }
]

const text = {
  ta: {
    title: 'தமிழ்நாடு ஹோட்டல் புக்',
    subtitle: 'தமிழ்நாட்டின் பிரபலமான ஹோட்டல்களை தேடி, உங்களுக்கு ஏற்றவை புக் செய்யுங்கள்.',
    search: 'தேடுக',
    searchPlaceholder: 'ஹோட்டல் பெயர் அல்லது நகரம்',
    region: 'நகரம்',
    allRegions: 'அனைத்து',
    totalHotels: 'மொத்தம்',
    perNight: ' / இரவு',
    roomsAvailable: 'அறைகள் கிடைக்கும்',
    book: 'புக் செய்ய',
    noResults: 'கீழ் தேடுங்கள்: பொருத்தமான ஹோட்டல் காணவில்லை.',
    bookingConfirmed: 'புக் நிச்சயம்!',
    bookingSummary: 'நீங்கள் {hotel} இல் ஒரு அறை புக் செய்துள்ளீர்கள். மொத்த செலவு: ₹{price}.',
    bookingLink: 'மேலும் விவரங்களுக்கு இங்கே கிளிக் செய்யவும்',
    language: 'மொழி'
  },
  en: {
    title: 'Tamil Nadu Hotel Booking',
    subtitle: 'Search and book top hotels across Tamil Nadu.',
    search: 'Search',
    searchPlaceholder: 'Hotel name or city',
    region: 'City',
    allRegions: 'All',
    totalHotels: 'Total',
    perNight: ' / night',
    roomsAvailable: 'rooms available',
    book: 'Book Now',
    noResults: 'No matching hotels found. Try another search.',
    bookingConfirmed: 'Booking Confirmed!',
    bookingSummary: 'You booked a room at {hotel}. Total cost: ₹{price}.',
    bookingLink: 'Click here for more details',
    language: 'Language'
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [language, setLanguage] = useState('ta')
  const [hotels, setHotels] = useState([])
  const [bookedHotel, setBookedHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const activeText = text[language]

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('/api/hotels')
        if (!response.ok) {
          throw new Error('Failed to fetch hotels')
        }
        const data = await response.json()
        setHotels(data)
      } catch (err) {
        console.error(err)
        setError(activeText.error)
      } finally {
        setLoading(false)
      }
    }

    loadHotels()
  }, [activeText.error])

  const filteredHotels = useMemo(() => {
    const queryLower = query.toLowerCase()

    return hotels.filter((hotel) => {
      const matchesQuery =
        hotel.name.en.toLowerCase().includes(queryLower) ||
        hotel.name.ta.toLowerCase().includes(queryLower) ||
        hotel.city.en.toLowerCase().includes(queryLower) ||
        hotel.city.ta.toLowerCase().includes(queryLower)

      const matchesRegion =
        selectedRegion === 'All' || hotel.city.en === selectedRegion

      return matchesQuery && matchesRegion
    })
  }, [hotels, query, selectedRegion])

  const handleBook = async (hotel) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: hotel.id,
          hotelName: hotel.name,
          price: hotel.price
        })
      })

      if (!response.ok) {
        throw new Error('Booking request failed')
      }

      setBookedHotel(hotel)
    } catch (err) {
      console.error(err)
      setError(language === 'ta' ? 'புக் செய்வதில் சிக்கல் ஏற்பட்டது. பின்னர் முயலவும்.' : 'Booking failed. Please try again.')
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>{activeText.title}</h1>
          <p>{activeText.subtitle}</p>
        </div>
        <div className="language-select">
          <label>
            {activeText.language}
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main>
        <section className="search-panel">
          <div className="search-controls">
            <label>
              {activeText.search}
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={activeText.searchPlaceholder}
              />
            </label>

            <label>
              {activeText.region}
              <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value)}>
                {regionOptions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label[language]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="hotel-count">
            {activeText.totalHotels} {filteredHotels.length} {language === 'ta' ? 'ஹோட்டல்கள்' : 'hotels'}
          </div>
        </section>

        {loading && <div className="empty-state">{activeText.loading}</div>}
        {error && <div className="empty-state">{error}</div>}

        {!loading && !error && (
          <section className="hotel-list">
          {filteredHotels.map((hotel) => (
            <article key={hotel.id} className="hotel-card">
              <div className="hotel-card-header">
                <div>
                  <h2>{hotel.name[language]}</h2>
                  <p>{hotel.city[language]}, {hotel.region[language]}</p>
                </div>
                <span className="rating">⭐ {hotel.rating}</span>
              </div>

              <p>{hotel.description[language]}</p>

              <div className="hotel-details">
                <span>₹{hotel.price}{activeText.perNight}</span>
                <span>{hotel.availableRooms} {activeText.roomsAvailable}</span>
              </div>

              <button className="book-button" onClick={() => handleBook(hotel)}>
                {activeText.book}
              </button>
            </article>
          ))}

          {filteredHotels.length === 0 && (
            <div className="empty-state">{activeText.noResults}</div>
          )}
        </section>
        )}

        {bookedHotel && (
          <section className="booking-summary">
            <h3>{activeText.bookingConfirmed}</h3>
            <p>
              {activeText.bookingSummary
                .replace('{hotel}', bookedHotel.name[language])
                .replace('{price}', bookedHotel.price)}
            </p>
            <a href={bookedHotel.url} target="_blank" rel="noreferrer" className="booking-link">
              {activeText.bookingLink}
            </a>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
