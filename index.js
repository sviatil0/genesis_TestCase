const express = require('express');
const app = express();

const Client = require('coinbase').Client;
const client = new Client({
    'apiKey': 'qY8QFIYsMvkNL9Ow',
    'apiSecret': '7VYANrgdCWiChzC8aLH16u9MI76iy0FO',
    'strictSSL': false
  });

currencyCode = 'UAH'

// const currencies = [
//     { id: "BTC", name: "bitcoin"},
//     {id: 2, name: "ethereum"},
//     {id: 3, name: "litecoin"},
// ];

app.get('/', (req,res) => {
    res.send('Hello, world!!!');
});

// app.get('/api/rate/:id', (req,res) => {
//     const currency = currencies.find(c => c.id === parseInt(req.params.id));
    

//     if(!currency) res.status(404).send("Wrong ID");
//     res.send(currency);
// });

app.get('/api/rate/', (req,res) => {
        client.getSpotPrice({"currency": currencyCode}, function(err, price) {
        res.send('Current bitcoin price in ' + currencyCode + ': ' +  price.data.amount);
        res.sendStatus(200);
        
        console.log('Current bitcoin price in ' + currencyCode + ': ' +  price.data.amount);
        });
    
});




//Server part
//PORT 
const port = process.env.PORT || 3000

app.listen(port,() => console.log(`Listening on port: ${port}...`));