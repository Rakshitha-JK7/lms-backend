import express from "express";
import { courses } from "../services/courses.js";

const router = express.Router();

router.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  console.log("Id = ", id);

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
      debugmessage: error.message,
      data: null,
    });
  }
});

export default router;
