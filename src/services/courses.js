import {getCourses} from "../repository/courses.js";

export const courses = async(id)=>{
  try{
    const result = await getCourses(id);
    return result;
  }catch(error){
    return{
      status:false,
      debugmessage:error.message,
    };
  };
}