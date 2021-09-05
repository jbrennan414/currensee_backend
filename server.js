// server.js
const express = require('express');
const cron = require('node-cron')
const app = express();
const { getRatesFromRedis } = require('./getRatesFromRedis');
const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');
require('dotenv').config();

cron.schedule('0 */6 * * *', function() {
    addExchangeRatesToRedis()
})

app.get('/rates', async (req, res) => {
    let exchangeRates = await getRatesFromRedis()
    res.send(exchangeRates);
});

const PORT = 5000;
app.listen(PORT, () => {
    
    console.log(`Server listening on port ${PORT}`);
});