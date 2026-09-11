import express from "express";
import userRouter from "./controller/signup.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
