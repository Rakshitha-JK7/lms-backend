import { getAssignmentsByCourse } from "../repository/assignment.js";

export const getAssignment = async (course_id) => {
  try {
    const result = await getAssignmentsByCourse(course_id);

    return result;

  } catch (error) {
    return {
      status: false,
      message: "Failed to fetch assignments",
      debugMessage: error.message,
      data: null,
    };
  }
};