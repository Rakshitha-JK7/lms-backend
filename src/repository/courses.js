import pool from "../../db/db.js";

export const getCourses = async (id) => {
  try {
    console.log("Id = ", id, typeof id);

    const result = await pool.query(
      "SELECT c.* FROM COURSES c JOIN users u ON c.dept_id = u.dept_id WHERE u.id = $1 ORDER BY c.id",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        status: true,
        message: "No Courses available",
        data: [],
      };
    }

    if (result) {
      return {
        status: true,
        message: "Course Fetched Successfully!",
        data: result.rows,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Courses not fetched",
      debugmessage: error.message,
      data: null,
    };
  }
};
