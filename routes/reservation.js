const express = require('express');
const reservation = require('../models/reservation');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.put('/updatereservationdetails/:id', async (req, res) => {

  try{
  const user = await reservation.findById(req.params.id)
  if (!user){
    return res.json({status: 'false' , data:"No reservations found"});
  }else{
  user.email = req.body.email
  user.name= req.body.name
  const userStoredData = await user.save()
  res.json({status:'ok' ,data: userStoredData});
  }
  } catch (err) {
    res.json({status:'error' ,data: "Error Occured"});
}
});

router.get('/allreservations', async (req, res) => {
  try {
    const reserved= await reservation.find({});
    res.send(reserved);
  } catch (err) {
      res.json({status:'error' ,data: "Error Occured 1"});
  }
});

router.get('/getreservationdetails/:id', async (req, res) => {
    try {
        const reservations_list = await reservation.find({_id : req.params.id})
      if (!reservations_list) {
          return res.json({status: 'false' , data:"No reservations made"});
        }else{
      return res.send(reservations_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured in reservations"});
    }
  });

  router.get('/getreservationbyemail/:email', async (req, res) => {
    try {
        const reservations= await reservation.find({email : req.params.email})
      if (!reservations) {
          return res.json({status: 'false' , data:"No reservations made"});
        }else{
      return res.send(reservations);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured in reservations"});
    }
  });
  router.delete('/deletereservation/:location/:movie/:theater/:showtiming/:seats',auth.enhance, async (req, res) => {
    try{
        reservation.deleteMany({movie:req.params.movie,location:req.params.location,theater:req.params.theater,showtiming:req.params.showtiming,seats:req.params.seats}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletereservation/:location/:movie/:theater/:showtiming',auth.enhance, async (req, res) => {
    try{
        reservation.deleteMany({movie:req.params.movie,location:req.params.location,theater:req.params.theater,showtiming:req.params.showtiming}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletereservation/:location/:movie/:theater',auth.enhance, async (req, res) => {
    try{
        reservation.deleteMany({movie:req.params.movie,location:req.params.location,theater:req.params.theater}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletereservation/:location/:movie',auth.enhance, async (req, res) => {
    try{
        reservation.deleteMany({movie:req.params.movie,location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletereservation/:location',auth.enhance, async (req, res) => {
    try{
        reservation.deleteMany({location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })

  module.exports=router


