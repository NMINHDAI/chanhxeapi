const express = require('express');

const mongoose = require('mongoose');


const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
//connect to mongo db
mongoose
    .connect(
        process.env.MONGO_URL,
        {useNewUrlParser:true}
        )
    .then(()=>{
        console.log('connect to monggodb atlas');
}).catch(error => {
    console.log('something happened',error);
})


app.listen(PORT, () => {
    console.log('Server start at PORT', PORT);
})