// IMPORTS
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/books.js";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

// INITIATIONS
// Initiate Express
const app = express();
// Declare the use of json parsing from express
app.use(express.json());

// Use CORS policy to allow requests from React (Other domain)
// to this server domain
// Option 1: Allow All Origins
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

// Homepage
app.get('/', (req, res) => {
    // console.log(res);
    return res.status(200).send({message: "Sample"});
});

//  Get all routes from bookRoutes.js
app.use('/books', booksRoute);

// DATABASE CONNECTIONS

// Connecting to MongoDB through mongoose
mongoose.connect(mongoDBURL)
.then(() => {
    // Sets the port to listen to. It has callback function to
    // do something once connected
    app.listen(PORT, () =>  {
        console.log('App is listening to port: ' + PORT);
    });
    console.log("DB Connected");
})
.catch((e) => {
    console.log(e);
});
