
const express = require('express');
const movies = require('../models/movies');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/addmovie',auth.enhance, async (req, res) => {

    const moviedetails = {
         title : req.body.title,
        location : req.body.location,
        image: req.body.image
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
router.get('/allmovies', async (req, res) => {
    try {
      const movie = await movies.find({});
      res.send(movie);
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });


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
  router.post('/getmoviebyimage', async (req, res) => {
    try{
            const image = req.body.image
            const movies_list = await movies.find({ image: image})
            if (!movies_list) {
                return res.json({status: 'false' , data:"Movies not found"});
              }else{
            return res.send(movies_list);
              }
          } catch (err) {
              res.json({status:'error' ,data: "Error Occured 2"});
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
  
  router.delete('/deletemovie/:location',auth.enhance, async (req, res) => {
    try{
        movies.deleteMany({location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })
  router.delete('/deletemovie/:location/:title',auth.enhance, async (req, res) => {
    try{
        movies.deleteMany({title:req.params.title,location:req.params.location}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })

  module.exports=router