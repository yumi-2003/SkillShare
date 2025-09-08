const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//importing routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");

const app = express();

// global middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//routes
app.use(authRoutes);
app.use(courseRoutes);
app.use("/admin", adminRoutes);
app.use("/api", publicRoutes);

mongoose.connect(process.env["MONGODB_URL"]).then((_) => {
  app.listen(4000);
  console.log(
    "Server is up and running on http://localhost:4000 and connected to database."
  );
});
