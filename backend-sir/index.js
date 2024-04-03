require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT);

const app = express();

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected");
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // to allow json as request body
app.use("/assets", express.static("public"));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`application is running at port ${PORT}`);
});
