
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv') 
const authRoutes = require('./routes/auth')
dotenv.config()

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
connectToMongo();
app.use(cors());
app.use(express.json())
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/",authRoutes)

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});