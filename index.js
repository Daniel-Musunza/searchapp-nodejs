const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});
// Endpoint to search hotels
app.get('/search', async (req, res) => {
    try {
        const { HotelName, Rooms, Language, Location, HotelType, Rating, Country, checkIn, checkOut } = req.query;

        // Fetch hotels data from the API
        const response = await axios.get('https://hotelsapi-va2v.onrender.com/api/hotels');
        let hotels = response.data;

        
        // Filter hotels based on the provided parameters
        if (HotelName) {
            hotels = hotels.filter(hotel => hotel.HotelName.toLowerCase().includes(HotelName.toLowerCase()));
          
        }
        if (Rooms) {
            hotels = hotels.filter(hotel => hotel.Rooms === parseInt(Rooms));
        }
        if (Language) {
            hotels = hotels.filter(hotel => hotel.Language.toLowerCase().includes(Language.toLowerCase()));
        }
        if (Location) {
            hotels = hotels.filter(hotel => hotel.Location.toLowerCase().includes(Location.toLowerCase()));
        }
        if (HotelType) {
            hotels = hotels.filter(hotel => hotel.HotelType.toLowerCase().includes(HotelType.toLowerCase()));
        }
        if (Rating) {
            hotels = hotels.filter(hotel => hotel.Rating.toLowerCase().includes(Rating.toLowerCase()));
        }
        if (Country) {
            hotels = hotels.filter(hotel => hotel.Country.toLowerCase().includes(Country.toLowerCase()));
        }
        if (checkIn && checkOut) {
            // Assuming available dates are in the format "checkIn to checkOut"
            hotels = hotels.filter(hotel => {
                const availableDates = hotel['Available dates'];
                return availableDates && availableDates.includes(checkIn) && availableDates.includes(checkOut);
            });
        }

        res.json(hotels);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
