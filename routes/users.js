
const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const auth=require("../middlewares/auth")
const jwt=require("jsonwebtoken")
const usermodel=require("../models/usermodel")
const secretkey="jadgfahbnab%dnalhfl#abf%jl@abljf"


router.post("/login" , async(req,res) =>{
    const email = req.body.email
    const password = req.body.password
    await usermodel.findOne({email : email}).then(existuser =>{
        if(existuser){
            bcrypt.compare(password ,existuser.password, function(err , response){
                if(!err){
                    if(response){
                        const token= jwt.sign({_id:existuser._id , email:existuser.email}, secretkey, {expiresIn:'1h'})
                        res.json({status:'ok', data:{token , response , existuser}})
                    }else if(!response){
                        res.json({status:'False' , data:"Enter correct password"})
                    }
                }

            } )
        } else if(!existuser){
            res.json({status:'False' , data:"Entered credentials does not exist"})
        }
   }).catch(err=>{
        res.josn({status:"Error" , data:"Something went wrong"}) 
    })

})
router.get("/home" , auth.verifytoken , async(req,res)=>{

    if(req && req.decodedtoken){
        res.json({status:"ok" , data:"ok"})
    }
})
router.get("/adminhome" , auth.enhance , async(req,res)=>{

    if(req && req.token){
        res.json({status:"ok" , data:"ok"})
    }
})

router.post('/signup', async(req,res) => {
    const userdata = {
        name: req.body.name,
        phoneno:req.body.phoneno,
        email : req.body.email,
        password : req.body.password,
        role:"guest"
    }
    const salt = await bcrypt.genSalt(10)       
    await bcrypt.hash(req.body.password , salt).then(hashedPassword => {
        if(hashedPassword) {
            console.log('hashed password' , hashedPassword)
            userdata.password = hashedPassword
        }
    })

    await usermodel.create(userdata).then(userStoredData => {
        if(userStoredData && userStoredData._id) {
            console.log('user stored data' , userStoredData)
            res.json({status:'ok' ,data : userStoredData})
        }
    }).catch(err => {
        if(err) {
            res.json({status:'error' , data : err})
        }
    })
})
router.get('/allusers', async (req, res) => {
    try {
      const user = await usermodel.find({});
      res.send(user);
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });
  router.put('/updateuserrole/:email' , async (req, res) => {

    try{
    const user = await usermodel.find({email:req.params.email})

    if (!user){
      return res.json({status: 'false' , data:"No user found"});
    }else{
        for(let item of user){
            item.role = req.body.role
            const userStoredData = await item.save()
            console.log(userStoredData,"hello")
            res.json({status:'ok' ,data: userStoredData});  
        }  
    }
    } catch (err) {
      res.json({status:'error' ,data: "Error Occured in updating role"});
  }
  });



module.exports=router