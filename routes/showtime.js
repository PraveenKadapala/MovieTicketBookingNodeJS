
const express = require('express');
const showtime = require('../models/showtime');
const reservations =require('../models/reservation');
const auth = require('../middlewares/auth');
const { range } = require('express/lib/request');

const router = new express.Router();

router.post('/addshowtime',auth.enhance, async (req, res) => {

    const showtimedetails = {
        showtiming : req.body.showtiming,
        movie : req.body.movie,
        location: req.body.location,
        theater: req.body.theater,
        seats:req.body.seats,
        seatsavailable:req.body.seatsavailable,
        ticketprice : req.body.ticketprice
    }
    try {
        await showtime.create(showtimedetails).then(userStoredData => {
            if(userStoredData){
                res.json({status:'ok' ,data: userStoredData });
            }
        })
        } catch (err) {
        res.json({status:'error' ,data: "Error Occured"});
    }
})
router.get('/allshows', async (req, res) => {
  try {
    const show = await showtime.find({});
    res.send(show);
  } catch (err) {
      res.json({status:'error' ,data: "Error Occured 1"});
  }
});

router.get('/getshow/:id', async (req, res) => {
    try {
        const shows_list = await showtime.find({_id : req.params.id})
      if (!shows_list) {
          return res.json({status: 'false' , data:"No shows available"});
        }else{
      return res.send(shows_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 3"});
    }
  });
router.get('/getshowtiming/:movie/:theater/:location/:showtiming', async (req, res) => {
    try {
      const shows_list = await showtime.find({movie : req.params.movie , theater : req.params.theater,
        location : req.params.location,showtiming : req.params.showtiming})
      if (!shows_list) {
          return res.json({status: 'false' , data:"No shows available"});
        }else{
      return res.send(shows_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });

    router.get('/getshowtime/:movie/:theater/:location', async (req, res) => {
    try {
      const shows_list = await showtime.find({movie : req.params.movie , theater : req.params.theater
        , location : req.params.location})
      if (!shows_list) {
          return res.json({status: 'false' , data:"No shows available"});
        }else{
      return res.send(shows_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });
  router.delete('/deleteshowtime/:location/:movie/:theater/:showtiming',auth.enhance, async (req, res) => {
    try{
        showtime.deleteMany({movie:req.params.movie,location:req.params.location,theater:req.params.theater,showtiming:req.params.showtiming}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deleteshowtime/:location',auth.enhance, async (req, res) => {
    try{
        showtime.deleteMany({location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deleteshowtime/:location/:movie/:theater',auth.enhance, async (req, res) => {
    try{
        showtime.deleteMany({movie:req.params.movie,location:req.params.location,theater:req.params.theater}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deleteshowtime/:location/:movie',auth.enhance, async (req, res) => {
    try{
        showtime.deleteMany({movie:req.params.movie,location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  

  router.post('/bookseats',async(req,res)=>{

    // const { id, selected_seats} = req.body
    const seatdetails = {
        id : req.body.id,
        selected_seats : req.body.selected_seats
    }
    console.log(seatdetails.id)
    const selected_show= await showtime.findById(seatdetails.id)
    console.log(selected_show)
    console.log(seatdetails.selected_seats, "selected_seats")
        if(!selected_show){
        return res.json({status: 'false' , data:"Select only available shows"});
    }
    else{
        if (selected_show.seatsavailable<=0) {
            return res.json("Show Full. Please try again");
          }
          if (selected_show.seatsavailable<seatdetails.selected_seats.length){
            return res.json("only ", selected_show.seatsavailable ," are available");
          }

          console.log(selected_show.seats,"seatlayout")
          console.log(selected_show.seatsavailable,"availableseats")
          seatno=''
          for (let item of seatdetails.selected_seats){
            x=item[0]
            y=item[1]
            ascii=65
                seatno=seatno+String.fromCharCode(ascii+x)
                seatno=seatno+String(y+1)
                seatno=seatno+' ,'

            console.log(seatno)
            console.log(x , y, "x" , "y")
            console.log(selected_show.seats.length,"row length")
            if (selected_show.seats.length<x){
              return res.json("Selected seat out of range")
            }
            console.log(selected_show.seats[x],"selected_row")
            console.log(selected_show.seats[x].length,"selected_row length")
            if (selected_show.seats[x].length<y){
              return res.json("Selected seat out of range")
            }
            if (selected_show.seats[x][y]==1){
                return res.json("Seats already booked");
              }
            else{
                selected_show.seats[x][y]=1
                selected_show.seatsavailable-=1
            }
          }

      updated_show = await showtime.findByIdAndUpdate(seatdetails.id, {seats:selected_show.seats ,seatsavailable:selected_show.seatsavailable});
      await updated_show.save()
      // cinema = Cinema.findOne(showtime.cinemaId)
      // console.log(s) 
      const total=seatdetails.selected_seats.length*selected_show.ticketprice
      let obj={
        seats_booked:seatdetails.selected_seats.length,
        seats:seatno,
        showtiming:selected_show.showtiming,
        theater:selected_show.theater,
        movie:selected_show.movie,
        location:selected_show.location,
        ticketprice:selected_show.ticketprice,
        totalamount:total,
        email:"email",
        name:"name"
      }
      // const reservation = await Reservation.create({obj
      // });
      // console.log(obj)
      const reservation = new reservations(obj);
      await reservation.save()
      // console.log(showtime)
      // req
      // await showtime.save();
      res.json({status :"ok", data :reservation});
    }
  })

  module.exports=router