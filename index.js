const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')
// Import routes
const userRoutes = require("./routes/user_routes");
const superheroRoutes= require("./routes/super-routes");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

//http://localhost:3001/
app.listen(PORT, () => console.log('Server is running in port', PORT));

// http://localhost:3000/api/v1/users
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/superheros", superheroRoutes);



// Connect to MongoDB
const getConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        if (conn) {
            console.log(`MongoDB Connected on ${conn.connection.host}`);
        } else {
            console.log(`Failed to connect DB`);
        }
    } catch (error) {
        console.log(`Failed with error: ${error.message}`);
    }
};


getConnection();