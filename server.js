// server.js
const express = require('express');
const app = express();
const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');
const { getRatesFromRedis } = require('./getRatesFromRedis');
require('dotenv').config();


app.get('/seed_data', async (req, res) => {
    let exchangeRates = await addExchangeRatesToRedis(true)
    res.send(exchangeRates);
});

app.get('/', async (req, res) => {
    let exchangeRates = await getRatesFromRedis()
    res.send(exchangeRates);
});

const PORT = 5000;
app.listen(PORT, () => {
    
    console.log(`Server listening on port ${PORT}`);
});