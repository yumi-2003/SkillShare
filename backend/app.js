const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

//importing routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");
const profileRoutes = require("./routes/profile");
const reviewRoutes = require("./routes/review");
const quickRoutes = require("./routes/quick");
const skillPathRoutes = require("./routes/skillPath");
const courseProgressRoutes = require("./routes/courseProgress");

const app = express();

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

// global middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(
  multer({
    storage: storageConfigure,
    fileFilter: filterConfigure,
  }).array("image")
);

//routes
app.use(authRoutes);
app.use(courseRoutes);

app.use("/admin", adminRoutes);
app.use("/api", publicRoutes);
app.use("/api", profileRoutes);
app.use("/api", reviewRoutes);
app.use("/api", quickRoutes);
app.use("/api/course-progress", courseProgressRoutes);
app.use(skillPathRoutes);

mongoose.connect(process.env["MONGODB_URL"]).then((_) => {
  const server = app.listen(4000);
  server.on("listening", () => {
    console.log(
      "Server is up and running on http://localhost:4000 and connected to database."
    );
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        "\n❌  Port 4000 is already in use.\n" +
        "   To kill the existing process, run:\n" +
        "   npx kill-port 4000\n" +
        "   Then restart with: npm run start\n"
      );
      process.exit(1);
    } else {
      throw err;
    }
  });
});
