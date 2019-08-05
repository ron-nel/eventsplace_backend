const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const databaseUrl = process.env.DATABASE_URL || 'mongodb+srv://ronnel:ronnel@MongoDB2019@cluster0-g1fen.mongodb.net/test?retryWrites=true&w=majority';
const cors = require('cors');
//databse conection
mongoose.connect(databaseUrl, {useNewUrlParser:true});
const PORT = process.env.PORT || 4000;
mongoose.connection.once("open", ()=>{
	console.log("Remote Database Connection Established");
});
app.use(bodyParser.json());
app.listen(PORT, function(){
	console.log("Server is running on Port " + PORT);
});

const register = require("./routes/register");
app.use('/admin', register);

const authRouter = require("./routes/auth");
app.use('/admin', authRouter);


const post_routes = require("./routes/post_routes");
app.use('/admin', post_routes);

const room_routes = require("./routes/room_routes");
app.use('/admin', room_routes);

const schedule_routes = require("./routes/schedule_routes");
app.use('/admin', schedule_routes);