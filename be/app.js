var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var app = express();


var formRoute = require("./routes/formRoutes");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", formRoute);

app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });
  
module.exports = app;
