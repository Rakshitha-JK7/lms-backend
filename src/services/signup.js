import {user,findUser} from "../repository/signup.js";

export const adduser = async(fname,lname,age,email,password,role,usn,batch, designation,bio,phone)=>{
  try {
    const result = await user(fname,lname,age,email,password,role,usn,batch, designation,bio,phone);
    
    if(result)  
    {
      return result;
    }
  } catch (error) {
    return{
      status:false,
      debugmessage:error.message,
    };
  }
};

export const signinUser = async(email,password)=>{
  try{
    const result = await findUser(email,password);

    return result;
  }catch(error){
    return{
      status:false,
      message:"Signin services failed",
      debugmessage:error.message,
      data:null
    };
  }
};