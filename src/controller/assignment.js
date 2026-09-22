import express from "express";

import {
  getAssignment,
  addNewAssignment,
  getSingleAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentSubmissions,
  submitAssignment
} from "../services/assignment.js";

const router = express.Router();

router.get("/course/:course_id/assignment", async (req, res) => {
  const { course_id } = req.params;

  console.log("GET ASSIGNMENTS");
  console.log("COURSE ID:", course_id);

  try {
    const result = await getAssignment(course_id);

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    console.log("GET ASSIGNMENTS CONTROLLER ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetch assignments",
      debugMessage: error.message,
      data: null
    });
  }
});

router.post("/course/:course_id/assignment/createassignment", async (req, res) => {

  const { course_id } = req.params;

  try {

    const {
      title,
      descriptions,
      due_date,
      max_marks
    } = req.body;

    const result = await addNewAssignment(
      course_id,
      title,
      descriptions,
      due_date,
      max_marks
    );

    if (result.status) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {

    console.log("CREATE ASSIGNMENT CONTROLLER ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "Failed to create assignment",
      debugMessage: error.message,
      data: null
    });
  }
});

router.get("/course/:course_id/assignment/:assignment_id", async (req, res) => {

  const { course_id, assignment_id } = req.params;

  try {

    const result = await getSingleAssignment(
      course_id,
      assignment_id
    );

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(404).json(result);

  } catch (error) {

    console.log("GET ASSIGNMENT CONTROLLER ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetch assignment",
      debugMessage: error.message,
      data: null
    });
  }
});

router.put("/course/:course_id/assignment/:assignment_id", async (req, res) => {

  const { course_id, assignment_id } = req.params;

  try {

    const {
      title,
      descriptions,
      due_date,
      max_marks
    } = req.body;

    const result = await updateAssignment(
      course_id,
      assignment_id,
      title,
      descriptions,
      due_date,
      max_marks
    );

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: "Failed to update assignment",
      debugMessage: error.message,
      data: null
    });
  }
});

router.delete("/course/:course_id/assignment/:assignment_id", async (req, res) => {

  const { course_id, assignment_id } = req.params;

  try {

    const result = await deleteAssignment(
      course_id,
      assignment_id
    );

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: "Failed to delete assignment",
      debugMessage: error.message,
      data: null
    });
  }
});

router.get(
  "/course/:course_id/assignment/:assignment_id/submissions",
  async (req, res) => {

    try {

      const {
        course_id,
        assignment_id
      } = req.params;

      console.log(
        "GET ASSIGNMENT SUBMISSIONS:",
        course_id,
        assignment_id
      );

      const result =
        await getAssignmentSubmissions(
          course_id,
          assignment_id
        );

      return res.json(result);

    } catch (error) {

      console.error(
        "GET ASSIGNMENT SUBMISSIONS ERROR:",
        error
      );

      return res.status(500).json({
        status: false,
        message: "Failed to fetch assignment submissions",
        debugMessage: error.message,
        data: null
      });

    }

  }
);

router.post("/submit/:student_id",async (req, res) => {
    try {
      const { student_id } = req.params;

      const {
        assignment_id,
        file_url
      } = req.body;

      console.log("SUBMIT ASSIGNMENT");
      console.log("Student ID:", student_id);
      console.log("Assignment ID:", assignment_id);
      console.log("File URL:", file_url);

      if (!student_id) {
        return res.status(400).json({
          status: false,
          message: "Student ID is required",
          data: null
        });
      }

      if (!assignment_id || !file_url) {
        return res.status(400).json({
          status: false,
          message: "assignment_id and file_url are required",
          data: null
        });
      }

      const result = await submitAssignment(
        assignment_id,
        student_id,
        file_url
      );

      return res.json(result);

    } catch (error) {
      console.error(
        "SUBMIT ASSIGNMENT ERROR:",
        error
      );

      return res.status(500).json({
        status: false,
        message: "Assignment submission failed",
        debugMessage: error.message,
        data: null
      });
    }
  }
); 

export default router;