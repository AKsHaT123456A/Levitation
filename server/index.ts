import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./Configs/connection";
import authRoute from "./Routes/authRoute";
import stepRoute from "./Routes/stepRoute";
import path from "path";

const apiPrefix = "/api/v1";
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(`${apiPrefix}/auth`, authRoute);
app.use(`${apiPrefix}`, stepRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
