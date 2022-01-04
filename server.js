// server.js
const express = require('express');
const cron = require('node-cron')
const app = express();
const { getRatesFromRedis } = require('./getRatesFromRedis');
const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');
const fs = require("fs")

require('dotenv').config();

// cron.schedule('0 */6 * * *', function() {
    // addExchangeRatesToRedis()
// })

app.get('/add_rates', async (req, res) => {
    console.log("Add rates...")
    let exchangeRates = await addExchangeRatesToRedis()
    res.send("alright I think that worked");
});

app.get('/rates', async (req, res) => {
    let exchangeRates = await getRatesFromRedis()
    res.send(exchangeRates);
});

app.get("/", (req, res) => {
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            logger.error("index.html error", error.message)
            res.writeHead(404);
            res.write("Whoops, file not found")
        } else {
            res.write(data);
        }
        res.end()
    })
})

app.get("/privacy", (req, res) => {
    fs.readFile('./privacy.html', null, function (error, data) {
        if (error) {
            logger.error("privacy.html error", error.message)
            res.writeHead(404);
            res.write("Whoops, file not found")
        } else {
            res.write(data);
        }
        res.end()
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});