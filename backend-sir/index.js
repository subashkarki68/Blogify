require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Logger = require("./config/logger");
const morganMiddleware = require("./config/morganMiddleware");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT || 8000);
const CookieSecret = process.env.COOKIE_SECRET;

const app = express();
// const corsOptions = {
//   origin: ["https://blogify.ruchirajkarki.com.np", "http://localhost:5173"], // Allow requests from this origin
//   credentials: true, // Allow sending cookies with the request
// };
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','), // Allow requests from this origin
  credentials: true, // Allow sending cookies with the request
};

mongoose.connect(process.env.DB_URL).then(() => {
  Logger.info("Database connected");
});

app.use(cookieParser(CookieSecret));
app.use(cors(corsOptions));
app.use(morganMiddleware);
app.use(express.json()); // to allow json as request body

//Check if static folder is present
const fs = require("fs");
const path = require("path");

// Define the directory path
const dirPath = path.join(__dirname, "public/images/users");

// Check if the directory exists, if not, create it
if (!fs.existsSync(dirPath)) {
  Logger.info(`Directory ${dirPath} does not exist, creating one...`);
  fs.mkdirSync(dirPath, { recursive: true });
}

app.use("/static", express.static("public"));
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     process.env.NODE_ENV === "production"
//       ? "https://blogify.ruchirajkarki.com.np"
//       : "http://localhost:5173"
//   );
//   next();
// });

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  Logger.info(`application is running at port ${PORT}`);
});
