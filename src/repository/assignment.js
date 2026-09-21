import { pool } from "../db/db.js";

export const getAssignmentsByCourse = async (courseId) => {

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
    [courseId]
  );

  return result.rows;
};


export const addAssignment = async (
  courseId,
  title,
  descriptions,
  dueDate,
  maxMarks
) => {

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
      courseId,
      title,
      descriptions,
      dueDate,
      maxMarks
    ]
  );

  return result.rows[0];
};

export const getAssignmentById = async (id) => {

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
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


export const updateAssignment = async (
  id,
  title,
  descriptions,
  dueDate,
  maxMarks
) => {

  const result = await pool.query(
    `
    UPDATE assignments
    SET
      title = $1,
      descriptions = $2,
      due_date = $3,
      max_marks = $4
    WHERE id = $5
    RETURNING *
    `,
    [
      title,
      descriptions,
      dueDate,
      maxMarks,
      id
    ]
  );

  return result.rows[0];
};

export const deleteAssignment = async (id) => {

  const result = await pool.query(
    `
    DELETE FROM assignments
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};