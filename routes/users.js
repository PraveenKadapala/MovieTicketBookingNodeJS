
const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const auth=require("../middlewares/auth")
const jwt=require("jsonwebtoken")
const usermodel=require("../models/usermodel")
// const refreshtokens=[]

router.post("/login" , async(req,res) =>{
    const email = req.body.email
    const password = req.body.password
    await usermodel.findOne({email : email}).then(existuser =>{
        if(existuser){
            bcrypt.compare(password ,existuser.password, function(err , response){
                if(!err){
                    if(response){
                        const token= jwt.sign({_id:existuser._id , email:existuser.email}, "secretkey", {expiresIn:'20s'})
                        const refreshtoken=jwt.sign({_id:existuser._id , email:existuser.email}, "refreshkey", {expiresIn:'1h'})
                        refreshtokens.push(refreshtoken)
                        console.log(token,"Accesstoken")
                        res.json({status:'ok', data:{token ,refreshtoken, response , existuser}})
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

router.post("/renewaccesstoken", async(req,res)=>{
    const refreshtoken=req.body.refreshtoken
    // if(!refreshtoken || !refreshtokens.includes(refreshtoken))
        if(!refreshtoken || !refreshtokens.includes(refreshtoken)){
        return res.json({status:"False",message:"User not Authenticated"})
    }
    jwt.verify(refreshtoken,"refreshkey", (err,user)=>{
        if(!err){
            const accesstoken= jwt.sign({_id:user._id , email:user.email}, secretkey, {expiresIn:'20s'})
            console.log(accesstoken,"renewaccesstoken")
            res.json({status:'ok', data:{accesstoken, user}})
        }else{
            return res.json({status:"False",message:"User not Authenticated"})
        }
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
router.get('/allusers',auth.enhance , async (req, res) => {
    try {
      const user = await usermodel.find({});
      res.send(user);
    } catch (err) {
        res.json({status:'error' ,data: "Error Occured 1"});
    }
  });
  router.put('/updateuserrole/:email',auth.enhance , async (req, res) => {

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
  router.delete('/deleteuser/:email',auth.enhance , async (req, res) => {
    try{
        usermodel.deleteMany({email:req.params.email}).then(result=>{
            res.json({status:"ok" ,message:"Deleted Successfully", data:result})
        })
    }
    catch(err){
        res.send('error'+err)
    }
  })



module.exports=router