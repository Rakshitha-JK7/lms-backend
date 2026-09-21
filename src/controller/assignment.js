import express from "express";

import {
  getAssignment
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

export default router;