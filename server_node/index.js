require("dotenv").config();
require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/_index.routes');


const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use("/fashionHub/" , router);

const PORT = 5000;

app.listen(PORT , ()=>{
    console.log("server is up and running on port " + PORT)
})

