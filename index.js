import express from "express";
import mongoose from "mongoose";
import {Port, mongodbURL} from "./config.js";
import {Book} from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
//Middleware for handling cors policy
//option 1: Allow all origins with default of cors
app.use(cors());

//option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'https://localhost:3000',
//         method: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get("/", (req, res)=>{
    console.log(req);
    return res.status(200).send("welcome to the server");
})
//Routes for save a book
app.use('/books', booksRoute);

const port = Port || 3000;

mongoose.connect(mongodbURL)
.then(()=>{
    console.log("app connected to database"); 
    app.listen(port,()=>{
        console.log("Server is running on port "+port)
    })
})
.catch((err)=>{
    console.log(err);
})
