if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const express = require('express');
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const app = express();
const indexRouter = require("./routes/index");


// View Engine as Ejs
app.set('view engine', 'ejs');
// saying where are our views coming from
app.set('views', __dirname + '/views');  
app.set('layout', 'layouts/layout'); //Setting up our layouts
app.use(expressLayouts);
app.use(express.static('public'));


app.use("/", indexRouter)

// Connecting mongodb
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on("error", error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.listen(process.env.PORT || 3000)