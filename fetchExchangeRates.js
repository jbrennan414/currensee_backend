var fetch = require('node-fetch');
require('dotenv').config();

async function fetchExchangeRates(){
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}`)
    let json = await res.json();

    console.log("Successfully fetched live exchange rates:", json)

    return json;
}

module.exports = { fetchExchangeRates: fetchExchangeRates };