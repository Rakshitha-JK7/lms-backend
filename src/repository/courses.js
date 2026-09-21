import pool from "../../db/db.js";

export const getCourses = async (id) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM courses
       WHERE dept_id = (
         SELECT dept_id
         FROM users
         WHERE id = $1
       )
       ORDER BY id`,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        status: true,
        message: "No Courses Available",
        data: [],
      };
    }

    

    return {
      status: true,
      message: "Courses Fetched Successfully!",
      data: result.rows,
    };

  } catch (error) {
    return {
      status: false,
      message: "Courses not fetched",
      debugMessage: error.message,
      data: null,
    };
  }
};


export const fetchInstructorCourses = async (id) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM courses
       WHERE instructor_id = $1
       ORDER BY id`,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        status: true,
        message: "No Courses Available",
        data: [],
      };
    }

    return {
      status: true,
      message: "Courses Fetched Successfully!",
      data: result.rows,
    };

  } catch (error) {
    return {
      status: false,
      message: "Couldn't fetch courses from database",
      debugMessage: error.message,
      data: null,
    };
  }
};


export const createCourseRepo = async (
  instructor_id,
  dept_id,
  course_name,
  course_number
) => {
  try {
    const result = await pool.query(
      `INSERT INTO courses
       (instructor_id, dept_id, course_name, course_number)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        instructor_id,
        dept_id,
        course_name,
        course_number
      ]
    );

    return {
      status: true,
      message: "Course created successfully",
      data: result.rows[0],
    };

  } catch (error) {
    console.log("CREATE COURSE ERROR:", error);

    return {
      status: false,
      message: "Cannot create course",
      data: null,
      debugMessage: error.message,
    };
  }
};

export const fetchAdminCourses= async()=>{
  try {
    const result = await pool.query("SELECT c.id AS course_id,c.course_name,d.id AS dept_id ,d.dept_name FROM courses c JOIN dept d ON c.dept_id = d.id ORDER BY d.id");
    
    if (result.rows.length === 0) {
      return {
        status: true,
        message: "No Courses Available",
        data: [],
      };
    }

    return {
      status: true,
      message: "Courses Fetched Successfully!",
      data: result.rows,
    };
  } catch (error) {
    return {
      status: false,
      message: "Couldn't fetch courses from database",
      debugMessage: error.message,
      data: null,
    };
  }
}