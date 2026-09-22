import { getAssignmentsByCourse ,addAssignment,getAssignmentById,updateAssignmentById,deleteAssignmentById,getAssignmentSubmissions as getAssignmentSubmissionsRepository,createAssignmentSubmission} from "../repository/assignment.js";

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

export const addNewAssignment = async (
  course_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {
  try {
    const result = await addAssignment(
      course_id,
      title,
      descriptions,
      due_date,
      max_marks
    );

    return {
      status: true,
      message: "Assignment created successfully",
      data: result
    };

  } catch (error) {
    return {
      status: false,
      message: "Failed to add assignment",
      debugMessage: error.message,
      data: null
    };
  }
};

export const getSingleAssignment = async (
  course_id,
  assignment_id
) => {

  try {

    if (!course_id) {
      return {
        status: false,
        message: "Course ID is required",
        data: null
      };
    }

    if (!assignment_id) {
      return {
        status: false,
        message: "Assignment ID is required",
        data: null
      };
    }

    const assignment = await getAssignmentById(
      course_id,
      assignment_id
    );

    if (!assignment) {
      return {
        status: false,
        message: "Assignment not found",
        data: null
      };
    }

    return {
      status: true,
      message: "Assignment fetched successfully",
      data: assignment
    };

  } catch (error) {

    console.log("GET SINGLE ASSIGNMENT SERVICE ERROR:", error);

    return {
      status: false,
      message: "Failed to fetch assignment",
      debugMessage: error.message,
      data: null
    };
  }
};


export const updateAssignment = async (
  course_id,
  assignment_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {

  try {

    if (!course_id) {
      return {
        status: false,
        message: "Course ID is required",
        data: null
      };
    }

    if (!assignment_id) {
      return {
        status: false,
        message: "Assignment ID is required",
        data: null
      };
    }

    if (!title || !title.trim()) {
      return {
        status: false,
        message: "Assignment title is required",
        data: null
      };
    }

    if (!due_date) {
      return {
        status: false,
        message: "Due date is required",
        data: null
      };
    }

    if (
      max_marks === undefined ||
      max_marks === null ||
      max_marks === ""
    ) {
      return {
        status: false,
        message: "Maximum marks are required",
        data: null
      };
    }

    if (Number(max_marks) <= 0) {
      return {
        status: false,
        message: "Maximum marks must be greater than 0",
        data: null
      };
    }

    const assignment = await updateAssignmentById(
      course_id,
      assignment_id,
      title,
      descriptions,
      due_date,
      Number(max_marks)
    );

    if (!assignment) {
      return {
        status: false,
        message: "Assignment not found",
        data: null
      };
    }

    return {
      status: true,
      message: "Assignment updated successfully",
      data: assignment
    };

  } catch (error) {

    console.log("UPDATE ASSIGNMENT SERVICE ERROR:", error);

    return {
      status: false,
      message: "Failed to update assignment",
      debugMessage: error.message,
      data: null
    };
  }
};

export const deleteAssignment = async (
  course_id,
  assignment_id
) => {

  try {

    if (!course_id) {
      return {
        status: false,
        message: "Course ID is required",
        data: null
      };
    }

    if (!assignment_id) {
      return {
        status: false,
        message: "Assignment ID is required",
        data: null
      };
    }

    const assignment = await deleteAssignmentById(
      course_id,
      assignment_id
    );

    if (!assignment) {
      return {
        status: false,
        message: "Assignment not found",
        data: null
      };
    }

    return {
      status: true,
      message: "Assignment deleted successfully",
      data: assignment
    };

  } catch (error) {

    console.log("DELETE ASSIGNMENT SERVICE ERROR:", error);

    return {
      status: false,
      message: "Failed to delete assignment",
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

    return await getAssignmentSubmissionsRepository(
      course_id,
      assignment_id
    );

  } catch (error) {

    return {
      status: false,
      message: "Failed to fetch assignment submissions",
      debugMessage: error.message,
      data: null
    };

  }
};

  export const submitAssignment = async (
  assignment_id,
  student_id,
  file_url
) => {
  try {
    return await createAssignmentSubmission(
      assignment_id,
      student_id,
      file_url
    );

  } catch (error) {
    return {
      status: false,
      message: "Assignment submission failed",
      debugMessage: error.message,
      data: null
    };
  }
};