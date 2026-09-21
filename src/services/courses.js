import {createCourseRepo,getCourses,fetchAdminCourses,fetchInstructorCourses} from "../repository/courses.js";

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

export const getInstructorCourses = async(id)=>{
  try{
    const result = await fetchInstructorCourses(id);
    return result;
  }catch(error){
    return{
      status:false,
      debugmessage:error.message,
    };
  };
}


export const createCourse = async (
  instructor_id,
  dept_id,
  course_name,
  course_number
) => {
  try {

    if (
      !instructor_id ||
      !dept_id ||
      !course_name ||
      !course_number
    ) {
      return {
        status: false,
        message: "All fields are required",
        data: null
      };
    }

    const result = await createCourseRepo(
      instructor_id,
      dept_id,
      course_name,
      course_number
    );

    return result;

  } catch (error) {
    console.log(error);

    return {
      status: false,
      message: "Failed to create course",
      data: null
    };
  }
};

export const getAdminCourses = async()=>{
  try{
    const result = await fetchAdminCourses();
    return result;
  }catch(error){
    return{
      status:false,
      debugmessage:error.message,
    };
  };
}