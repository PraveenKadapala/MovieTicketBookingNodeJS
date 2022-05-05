
const express = require('express');
const locations = require('../models/locations');

const router = new express.Router();


router.post('/addlocation', async (req, res) => {

    const locationdetails = {
        location : req.body.location
    }
    try {
        await locations.create(locationdetails).then(userStoredData => {
            if(userStoredData){
                res.json({status:'ok' ,data: userStoredData });
            }
        })
        } catch (err) {
        res.json({status:'error' ,data: "Error Occured"});
    }
})

router.post('/searchlocation', async (req, res) => {
    try{
    const location = req.body.location
    await locations.findOne({location : location}).then(existuser =>{
        if(existuser){
            res.json({status:'ok' , data: existuser})
        }else{
            res.json({status:'false' , data:"Location not found"})
        }
    })
    }catch (err){
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });

  module.exports=router