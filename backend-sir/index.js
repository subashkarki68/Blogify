require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT || 8000);
const CookieSecret = process.env.COOKIE_SECRET;

const app = express();
const corsOptions = {
  origin: ["https://blogify.ruchirajkarki.com.np", "http://localhost:5173"], // Allow requests from this origin
  credentials: true, // Allow sending cookies with the request
};

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected");
});

app.use(cookieParser(CookieSecret));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json()); // to allow json as request body
app.use("/assets", express.static("public"));
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
  console.log(`application is running at port ${PORT}`);
});
