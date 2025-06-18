import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoute from "./routes/v1/clientRoute.js";
import { apiKeyMiddleware } from "./middleware/apiKeyMiddleware.js";

dotenv.config();

const app = express();
const port = 3000;
const baseApiUrl = process.env.BASE_API_URL || "/api/v1";

app.use(cors());
app.use(express.json());

app.use(apiKeyMiddleware);

app.use(`${baseApiUrl}/clients`, clientRoute);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}${baseApiUrl}`);
  console.log("Server is running on port " + port);
});