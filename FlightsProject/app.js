const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://anassakker803:rC3q7C3tHuTFGoQG@booking.rsryegw.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());

const url = "mongodb+srv://anassakker803:rC3q7C3tHuTFGoQG@booking.rsryegw.mongodb.net/?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
// Import routes
const flightRoutes = require('./routes/flights');
const passengerRoutes = require('./routes/passenger');
const reservationRoutes = require('./routes/reservations');

// Use routes
app.use('/flights', flightRoutes);
app.use('/passenger', passengerRoutes);
app.use('/reservations', reservationRoutes);

//const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   //console.log(Server is running on port ${PORT});
// //});