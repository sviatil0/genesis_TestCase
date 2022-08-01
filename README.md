# Test Case API written in node.js for the Genesis Software Engineering School

## Dependencies
1.    coinbase : ^2.0.8,
2.    express: ^4.18.1,
3.    lowdb: ^1.0.0,
4.    nodemailer: ^6.7.7,
5.    nodemon: ^2.0.19,
6.    swagger-jsdoc: ^6.2.1,
7.    swagger-ui-express: ^4.5.0,
8.    Docker: ^4.11.0

## Installation
```bash
git clone git@github.com:sviatil0/genesis_TestCase.git 

```
## How to use?

1. Install all the dependencies 
2. Run 

```bash
docker run -it -p 4000:4000 -v ${pwd}:/app  genesis-test-case //Windows PowerShell

docker run -t -p 4000:4000 genesis-test-case // If linux

```
3. Use the link "localhost:4000/api" in your browser. 

### How it is working?

In this project I used CoinBase's API for node.js, to obtain the current information about the spot price of the BTC in UAH. I made a database in the JSON file, in which I am storing the subscribed emails. I am using the nodemailer and Gmail BOT account to send all the information to the emails in a database.

I chose coinbase for it's reputation as a very trustworthy service.

Quote from -> https://www.softwaretestinghelp.com/coinbase-review/

***Coinbase – one of the most trusted, safe, and legit cryptocurrency.***