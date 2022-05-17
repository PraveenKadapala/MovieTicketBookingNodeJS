
const express=require("express")
const mongoose=require("mongoose")
const userrouter=require("./routes/users")
const locationrouter=require("./routes/locations")
const movierouter=require("./routes/movies")
const theaterrouter=require("./routes/theaters")
const showtimerouter = require('./routes/showtime');
const reservationrouter = require("./routes/reservation");
const url="mongodb://localhost/users"
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(url , {useNewUrlParser : true, useUnifiedTopology : true})

app.use("/users" , userrouter)
app.use("/location", locationrouter)
app.use("/movie", movierouter)
app.use("/theater", theaterrouter)
app.use("/showtime", showtimerouter)
app.use("/reservation", reservationrouter)

mongoose.connection.on('open' , ()=>{
     console.log("connected...")
 })

 app.listen(9000 ,()=>{
     console.log("server started")
 })

