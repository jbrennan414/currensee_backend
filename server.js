// server.js
const express = require('express');
const app = express();
const { getRatesFromRedis } = require('./getRatesFromRedis');
require('dotenv').config();

app.get('/rates', async (req, res) => {
    let exchangeRates = await getRatesFromRedis()
    res.send(exchangeRates);
});

const PORT = 5000;
app.listen(PORT, () => {
    
    console.log(`Server listening on port ${PORT}`);
});