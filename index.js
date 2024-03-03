const express = require('express');
const axios = require('axios');
const path = require('path');
const { parseString } = require('xml2js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Endpoint to search hotels
app.get('/search', async (req, res) => {
    try {
        const { Adults, Children, Language, Location, HotelType, Rating, Country, DateFrom, DateTo } = req.query;

        const xmlRequest = `
                <SearchHotelsRequest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                    <Username>liyanahotels</Username>
                    <Password>@60033*</Password>
                    <DateFrom>2024-04-01</DateFrom>
                    <DateTo>2024-04-10</DateTo>
                    <Rooms>
                        <Room Adults="2" Children="0" ChildrenAges="" />
                    </Rooms>
                    <Language>en</Language>
                    <IsOptimized>true</IsOptimized>
                    <UseTariff>false</UseTariff>
                </SearchHotelsRequest>
            `;

        try {
            // Send POST request to API
            const response = await axios.post('https://xml.avra.vacations/services/webservice.asmx?op=HotelsSearch', xmlRequest, {
                headers: {
                    'Content-Type': 'text/xml',
                },
            });

            // Parse XML response
            const jsonData = await parseXMLResponse(response.data);

            // Send JSON response
            res.json(jsonData);
        } catch (error) {
            console.error('Error:', error.message);
            console.error('Response:', error.response.data); // Log response data for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to parse XML response
async function parseXMLResponse(xmlData) {
    return new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
