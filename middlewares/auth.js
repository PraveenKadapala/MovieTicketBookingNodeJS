const jwt=require("jsonwebtoken")
const User=require('../models/usermodel')

const secretkey="jadgfahbnab%dnalhfl#abf%jl@abljf"

const verifytoken= (req,res,next) =>{
    if(!req.headers.authorization){
        res.json({status:"error" , data:"Unauthorized request"})
      }
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
const enhance = async (req, res, next) => {
    try {
      if(!req.headers.authorization){
        res.json({status:"error" , data:"Unauthorized request"})
      }
      const token =  req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, secretkey);
      
      const user = await User.findOne({
        email: decoded.email,
      });
      console.log(user,"Admin user")
      if (!user || user.role !== 'admin') throw new Error();
      req.token = token;
      req.user = user;
      next();
    } catch (e) {
        res.json({status:"error" , data:"Error Occured in Authentication"})
    }
  };



module.exports ={verifytoken, enhance};