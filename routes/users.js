
const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const usermodel=require("../models/usermodel")
const verifytoken=require("../verifytoken")
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
router.get("/dashboard" , verifytoken , async(req,res)=>{

    if(req && req.decodedtoken){
        console.log(req.decodedtoken)
        res.json({status:"ok" , data:"ok"})
    }
})

router.post('/signup', async(req,res) => {
    const userdata = {
        name: req.body.name,
        phoneno:req.body.phoneno,
        email : req.body.email,
        password : req.body.password
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

module.exports=router