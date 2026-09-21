import express from "express";
import {
  createCourse,
  courses,
  getInstructorCourses,
  getAdminCourses
} from "../services/courses.js";

const router = express.Router();

router.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await courses(id);

    if (course.status) {
      return res.status(200).json(course);
    }

    return res.status(400).json(course);

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch courses",
      debugMessage: error.message,
      data: null,
    });
  }
});


router.get("/instructorCourses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getInstructorCourses(id);

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch instructor courses",
      debugMessage: error.message,
      data: null
    });
  }
});


router.post("/createCourse", async (req, res) => {
  try {

    const {
      instructor_id,
      dept_id,
      course_name,
      course_number
    } = req.body;

    console.log("CREATE COURSE BODY:", req.body);

    const result = await createCourse(
      instructor_id,
      dept_id,
      course_name,
      course_number
    );

    if (!result.status) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    console.log("CREATE COURSE CONTROLLER ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      debugMessage: error.message,
      data: null
    });
  }
});

router.get("/adminCourses", async (req, res) => {

  try {
    const result = await getAdminCourses();

    if (result.status) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch admin courses",
      debugMessage: error.message,
      data: null
    });
  }
});


export default router;