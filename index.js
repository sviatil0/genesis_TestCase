const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');

const lowdb = require('lowdb');

const FileS = require("lowdb/adapters/FileSync");

const ad = new FileS("db.json");
const db = lowdb(ad);




let newData={
    "email":"1@gmail.com"
};





const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { listenerCount } = require('events');
swaggerDocument = require('./swagger.json');

const Client = require('coinbase').Client;
const client = new Client({
    'apiKey': 'qY8QFIYsMvkNL9Ow',
    'apiSecret': '7VYANrgdCWiChzC8aLH16u9MI76iy0FO',
    'strictSSL': false
  });

currencyCode = 'UAH'

app.get('/api/rate', (req,res) => {
        client.getSpotPrice({"currency": currencyCode}, function(err, price) {
            res.json({"BTC-UAH": price.data.amount});
        });
    
});

app.post('/api/subscribe', (req,res) => {
    const email = req.body;

    const check = req.app.db.get("emails").find(email).value();
  
     if (!check){
        
        app.db.get("emails").push(req.body).write();
        res.send(200);
    }
    else {
        res.send(409);
    }
   
});



//Server part
//PORT 
const port = process.env.PORT || 3000
app.db = db;


app.use(
    '/api',
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument)
  );
  
app.listen(port,() => console.log(`Listening on port: ${port}...`));