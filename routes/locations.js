
const express = require('express');
const locations = require('../models/locations');
const auth = require('../middlewares/auth');

const router = new express.Router();


router.post('/addlocation',auth.enhance, async (req, res) => {

    const locationdetails = {
        location : req.body.location,
        image: req.body.image
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

router.get('/alllocations', async (req, res) => {
    try {
      const location = await locations.find({});
      res.send(location);
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });

  router.post('/getlocationbyimage', async (req, res) => {
    try{
            const image = req.body.image
            const locations_list = await locations.find({ image: image})
            if (!locations_list) {
                return res.json({status: 'false' , data:"Locations not found"});
              }else{
            return res.send(locations_list);
              }
          } catch (err) {
              res.json({status:'error' ,data: "Error Occured 2"});
          }
        });

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
  router.delete('/deletelocation/:location',auth.enhance, async (req, res) => {
    try{
        locations.deleteOne({location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })


  module.exports=router