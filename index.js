const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const lowdb = require('lowdb');
const FileS = require("lowdb/adapters/FileSync");
const ad = new FileS("db.json");
const nodemailer = require('nodemailer'); 

const db = lowdb(ad);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'no.reply.genesisTestCase@gmail.com',
      pass: 'bpcifhojdanmvqyw'
    }
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const swaggerUI = require('swagger-ui-express');
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

app.post('/api/sendEmails', (req,res) => {
    emails_array = app.db.get('emails').value();
    let a =  client.getSpotPrice({"currency": currencyCode}, function(err, price) {
        
        emails_array.forEach( item => {
            
            let letter = {
                from: "no.reply.genesisTestCase@gmail.com",
                to: item.email,
                subject: "Here is new BTC rate in UAH",
                text: `BTC-${currencyCode} : ${ price.data.amount} ${currencyCode}`
        };

            transporter.sendMail(letter, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
              
        
        }); 
              
    });
        res.sendStatus(200);

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