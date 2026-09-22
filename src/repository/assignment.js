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

export const addAssignment = async (
  course_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO assignments
      (
        course_id,
        title,
        descriptions,
        due_date,
        max_marks
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        course_id,
        title.trim(),
        descriptions || null,
        due_date,
        max_marks
      ]
    );

    return result.rows[0];

  } catch (error) {
    return {
      status: false,
      message: "Failed to add assignment",
      debugMessage: error.message,
      data: null
    };
  }
};

export const getAssignmentById = async (
  course_id,id
) => {

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
      AND id = $2
      `,
      [
        course_id,
        id
      ]
    );

    return result.rows[0] || null;

  } catch (error) {

    return {
      status: false,
      message: "Failed to fetch assignment ",
      debugMessage: error.message,
      data: null
    };
  }
};

export const updateAssignmentById = async (
  course_id,
  assignment_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {

  try {

    const result = await pool.query(
      `
      UPDATE assignments
      SET
        title = $1,
        descriptions = $2,
        due_date = $3,
        max_marks = $4
      WHERE course_id = $5
      AND id = $6
      RETURNING *
      `,
      [
        title.trim(),
        descriptions || null,
        due_date,
        max_marks,
        course_id,
        assignment_id
      ]
    );

    return result.rows[0] || null;

  } catch (error) {

    return {
      status: false,
      message: "Failed to update assignment ",
      debugMessage: error.message,
      data: null
    };
  }
};

export const deleteAssignmentById = async (
  course_id,
  assignment_id
) => {

  try {

    const result = await pool.query(
      `
      DELETE FROM assignments
      WHERE course_id = $1
      AND id = $2
      RETURNING *
      `,
      [
        course_id,
        assignment_id
      ]
    );

    return result.rows[0] || null;

  } catch (error) {

    return {
      status: false,
      message: "Failed to delete assignment ",
      debugMessage: error.message,
      data: null
    };
  }
};

export const createAssignmentSubmission = async (
  assignment_id,
  student_id,
  file_url
) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO submissions
      (
        assignment_id,
        student_id,
        file_url
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [
        assignment_id,
        student_id,
        file_url
      ]
    );

    return {
      status: true,
      message: "Assignment submitted successfully",
      data: result.rows[0]
    };

  } catch (error) {
    return {
      status: false,
      message: "Assignment submission failed",
      debugMessage: error.message,
      data: null
    };
  }
};

export const getAssignmentSubmissions = async (
  course_id,
  assignment_id
) => {

  try {

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.assignment_id,
        s.student_id,

        u.fname,
        u.lname,

        s.file_url,
        s.submitted_at,
        s.grade,
        s.feedback

      FROM submissions s

      INNER JOIN assignments a
        ON s.assignment_id = a.id

      INNER JOIN users u
        ON s.student_id = u.id

      WHERE a.course_id = $1
        AND s.assignment_id = $2

      ORDER BY s.submitted_at DESC
      `,
      [
        course_id,
        assignment_id
      ]
    );


    return {

      status: true,

      message:
        "Assignment submissions fetched successfully",

      data: result.rows

    };


  } catch (error) {

    console.error(
      "GET ASSIGNMENT SUBMISSIONS ERROR:",
      error
    );


    return {

      status: false,

      message:
        "Failed to fetch assignment submissions",

      debugMessage:
        error.message,

      data: null

    };

  }

};