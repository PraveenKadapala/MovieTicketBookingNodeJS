
const express = require('express');
const theaters = require('../models/theaters');

const router = new express.Router();


router.post('/addtheater', async (req, res) => {

    const theaterdetails = {
        theater : req.body.theater,
        title : req.body.title
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

  router.get('/gettheater/:id', async (req, res) => {
    try {
      const theaters_list = await theaters.find({title: req.params.id})
      if (!theaters_list) {
          return res.json({status: 'false' , data:"Movies not found"});
        }else{
      return res.send(theaters_list);
        }
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 2"});
    }
  });
  
  module.exports=router