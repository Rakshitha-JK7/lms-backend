import pool from "../../db/db.js";

export const getAssignmentsByCourse = async (course_id) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        course_id,
        title,
        descriptions,
        due_date,
        max_marks,
        created_at
      FROM assignments
      WHERE course_id = $1
      ORDER BY due_date ASC
      `,
      [course_id]
    );

    return {
      status: true,
      message: "Assignments Fetched Successfully!",
      data: result.rows,
    };

  } catch (error) {
    return {
      status: false,
      message: "Assignments not fetched",
      debugMessage: error.message,
      data: null,
    };
  }
};