import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// app.use(
//     cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//     })
// );

const mongoServer = () => {
    mongoose.connect(mongoDBURL)
        .then(() => {
            console.log("MongoDB Connected!");
        })
        .catch((error) => {
            console.log(error);
        });
};

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/books', booksRoute);


app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
    mongoServer();
});
