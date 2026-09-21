import express from "express";
import cors from "cors";

import userRouter from "./controller/signup.js";
import courseRouter from "./controller/courses.js";
import assignmentRouter from "./controller/assignment.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/assignment", assignmentRouter);

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Server is working",
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
