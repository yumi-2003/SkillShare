const mongoose = require("mongoose");
const Course = require("../models/course");
require("dotenv").config();

async function addLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database...");

    const reactLessons = [
      {
        title: "Introduction to React",
        content: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
        type: "video",
      },
      {
        title: "Understanding Components & Props",
        content: "Components are the building blocks of React applications. Props are used to pass data between them...",
        type: "blog",
      },
      {
        title: "Mastering State & Hooks",
        content: "https://www.youtube.com/watch?v=LlvBzyy-558",
        type: "video",
      },
    ];

    const nodeLessons = [
      {
        title: "Node.js Architecture & Event Loop",
        content: "https://www.youtube.com/watch?v=wmG6vS7uOtk",
        type: "video",
      },
      {
        title: "Deep Dive into Express Middleware",
        content: "Middleware functions are functions that have access to the request object, response object, and the next middleware function...",
        type: "blog",
      },
      {
        title: "Building Scalable APIs with MongoDB",
        content: "https://www.youtube.com/watch?v=ofme2o29ngU",
        type: "video",
      },
    ];

    // Update React Fundamentals
    await Course.updateOne(
      { title: "React Fundamentals" },
      { $set: { lessons: reactLessons, totalLessons: reactLessons.length } }
    );
    console.log("Updated React Fundamentals with lessons.");

    // Update Advanced Node.js
    await Course.updateOne(
      { title: "Advanced Node.js" },
      { $set: { lessons: nodeLessons, totalLessons: nodeLessons.length } }
    );
    console.log("Updated Advanced Node.js with lessons.");

    // Add generic lessons to any other courses that don't have any
    const otherCourses = await Course.find({ lessons: { $size: 0 } });
    for (const course of otherCourses) {
        if (course.title !== "React Fundamentals" && course.title !== "Advanced Node.js") {
            const genericLessons = [
                {
                    title: "Getting Started with " + course.title,
                    content: "Welcome to the course! In this lesson, we will cover the basics...",
                    type: "blog"
                },
                {
                    title: "Core Concepts Overview",
                    content: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
                    type: "video"
                }
            ];
            await Course.updateOne(
                { _id: course._id },
                { $set: { lessons: genericLessons, totalLessons: genericLessons.length } }
            );
            console.log(`Updated ${course.title} with generic lessons.`);
        }
    }

    console.log("All courses updated with lesson data!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding lessons:", err);
    process.exit(1);
  }
}

addLessons();
