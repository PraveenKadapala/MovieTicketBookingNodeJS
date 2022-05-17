const jwt=require("jsonwebtoken")
const User=require('./models/usermodel')
const secretkey="jadgfahbnab%dnalhfl#abf%jl@abljf"

const verifytoken= (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1]
    console.log("Token is" , token)

    if(!token){
        res.status(403).send("Token is required for authentication") 
    }else{
        try{
        const decodedtoken=jwt.verify(token , secretkey)
        req.decodedtoken= decodedtoken
        }
    catch{
        res.json({status:"error" , data:"Something went wrong"})
        }  
    }
    return next(); 
};



module.exports =verifytoken;