import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);

// app.use(/admin)
