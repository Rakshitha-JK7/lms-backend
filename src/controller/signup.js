import express from "express";
import { adduser,signinUser } from "../services/signup.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup",async(req,res)=>{
  const {fname,lname,age,email,password,role,usn,batch, designation,bio,phone} = req.body;
  try {
    const user = await adduser(fname,lname,age,email,password,role,usn,batch, designation,bio,phone);
    if(user.status){
      return res.status(201).json(user);
    }
    res.status({
      message:"Invalid credentials"
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to add data",  
      debugmessage:error.message,
    });
  }
});

router.post("/signin",async(req,res)=>{
  const {email,password} = req.body;

  try{

    const user = await signinUser(email, password);
    if(!user.status)
    {
      return res.status(401).json(user);
    }

    const token=jwt.sign(
      {
        id: user.data.id,
        role:user.data.role,
        email:user.data.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn:'4h'
      }
    );

    return res.status(200).json({
    status: true,
    message: "Signin successful",
    token: token,
    user:user.data
});
  }catch(error){
    return res.status(500).json({
      status: false,
      message: "Signin failed",
      debugmessage: error.message
    })
  }
})

export default router;