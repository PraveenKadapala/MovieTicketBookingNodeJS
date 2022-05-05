
const express = require('express');
const movies = require('../models/movies');

const router = new express.Router();

router.post('/addmovie', async (req, res) => {

    const moviedetails = {
        title : req.body.title,
        location : req.body.location
    }
    try {
        await movies.create(moviedetails).then(userStoredData => {
            if(userStoredData){
                res.json({status:'ok' ,data: userStoredData });
            }
        })
        } catch (err) {
        res.json({status:'error' ,data: "Error Occured"});
    }
})

router.post('/searchmovie', async (req, res) => {
    try{
    const movie = req.body.title
    await movies.findOne({title : movie}).then(existuser =>{
        if(existuser){
            res.json({status:'ok' , data: existuser})
        }else{
            res.json({status:'false' , data:"Movie not found"})
        }
    })
    }catch (err){
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });

    router.get('/getmovie/:id', async (req, res) => {
    try {
      const movies_list = await movies.find({ location: req.params.id})
      if (!movies_list) {
          return res.json({status: 'false' , data:"Movies not found"});
        }else{
      return res.send(movies_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });

  module.exports=router