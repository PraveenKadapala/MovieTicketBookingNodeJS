
const express = require('express');
const showtime = require('../models/showtime');

const router = new express.Router();

router.post('/addshowtime', async (req, res) => {

    const showtimedetails = {
        showtiming : req.body.showtiming,
        movie : req.body.movie,
        theater: req.body.theater
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

    router.get('/getshowtime/:id', async (req, res) => {
    try {
      const shows_list = await showtime.find({ theater: req.params.id})
      if (!shows_list) {
          return res.json({status: 'false' , data:"No shows available"});
        }else{
      return res.send(shows_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });

  module.exports=router