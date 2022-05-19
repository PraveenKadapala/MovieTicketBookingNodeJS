
const express = require('express');
const theaters = require('../models/theaters');
const auth = require('../middlewares/auth');

const router = new express.Router();


router.post('/addtheater',auth.enhance, async (req, res) => {

    const theaterdetails = {
        theater : req.body.theater,
        title : req.body.title,
        location : req.body.location,
        image : req.body.image
    }
    try {
        await theaters.create(theaterdetails).then(userStoredData => {
            if(userStoredData){
                res.json({status:'ok' ,data: userStoredData });
            }
        })
        } catch (err) {
        res.json({status:'error' ,data: "Something went wrong in adding theater"});
    }
})
router.get('/alltheaters', async (req, res) => {
    try {
      const theater = await theaters.find({});
      res.send(theater);
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });


router.post('/searchtheater', async (req, res) => {
    try{
    const theater = req.body.theater
    await theaters.findOne({theater : theater}).then(existuser =>{
        if(existuser){
            res.json({status:'ok' , data: existuser})
        }else{
            res.json({status:'false' , data:"Theater not found"})
        }
    })
    }catch (err){
        res.json({status:'error' ,data: "Something went wrong in selecting theater"});
    }
  });
  router.post('/gettheaterbyimage', async (req, res) => {
    try{
            const image = req.body.image
            const theaters_list = await theaters.find({ image: image})
            if (!theaters_list) {
                return res.json({status: 'false' , data:"Locations not found"});
              }else{
            return res.send(theaters_list);
              }
          } catch (err) {
              res.json({status:'error' ,data: "Error Occured 2"});
          }
        });

  router.get('/gettheater/:title/:location', async (req, res) => {
    try {
      const theaters_list = await theaters.find({title: req.params.title, location: req.params.location})
      if (!theaters_list) {
          return res.json({status: 'false' , data:"Movies not found"});
        }else{
      return res.send(theaters_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });
  router.delete('/deletetheater/:location/:title',auth.enhance, async (req, res) => {
    try{
        theaters.deleteMany({title:req.params.title,location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletetheater/:location',auth.enhance, async (req, res) => {
    try{
        theaters.deleteMany({location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletetheater/:location/:title/:theater',auth.enhance, async (req, res) => {
    try{
        theaters.deleteMany({title:req.params.title,location:req.params.location,theater:req.params.theater}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  
  module.exports=router