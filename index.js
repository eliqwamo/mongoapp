import express from "express";
import mongoose from "mongoose";
import actions from './controllers/actions.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT; 

app.use('/api', actions);
mongoose.set({'strictQuery':false});
mongoose.connect(mongo_url)
.then(results => {
    app.listen(port, function(){
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error);
})

