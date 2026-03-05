const mongoose = require("mongoose");
const Course = require("../models/course");
const Quick = require("../models/quick");
const SkillPath = require("../models/skillPath");
const Category = require("../models/category");
const User = require("../models/user");
const Badge = require("../models/badge");
require("dotenv").config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database...");

    // 1. Find or create a category
    let category = await Category.findOne({ name: "Development" });
    if (!category) {
      category = await Category.create({
        name: "Development",
        description: "Coding and Software Development",
      });
    }

    // 2. Find an instructor
    let instructor = await User.findOne({ userType: "instructor" });
    if (!instructor) {
      console.log("No instructor found. Please create a user with userType 'instructor' first.");
      process.exit(1);
    }

    // 3. Create sample Courses
    const course1 = await Course.create({
      title: "React Fundamentals",
      description: "Learn the basics of React.js including components, hooks, and props.",
      instructor: instructor._id,
      category: category._id,
      totalLessons: 12,
      duration: "4h 30m",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
    });

    const course2 = await Course.create({
      title: "Advanced Node.js",
      description: "Master backend development with Node.js, Express, and MongoDB.",
      instructor: instructor._id,
      category: category._id,
      totalLessons: 15,
      duration: "6h 15m",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=400",
    });

    // 4. Create sample Quicks
    const quick1 = await Quick.create({
      title: "State vs Props",
      description: "A quick 10-minute guide to understanding the difference between state and props.",
      category: category._id,
      points: 20,
      content: "Props are read-only components while state is managed within the component...",
    });

    const quick2 = await Quick.create({
      title: "JS Array Methods",
      description: "Master map, filter, and reduce in 5 minutes.",
      category: category._id,
      points: 15,
      content: "Map returns a new array, filter returns a subset, reduce returns a single value...",
    });

    // 5. Create a Badge
    const badge = await Badge.create({
      name: "Master of Full-Stack MERN Journey",
      description: "Awarded for completing the Full-Stack MERN Journey roadmap.",
      category: category._id,
      criteria: 1,
      image: "https://img.freepik.com/premium-vector/gold-medal-with-star-ribbon_602006-258.jpg",
    });

    // 6. Create the Skill Roadmap
    const skillPath = await SkillPath.create({
      title: "Full-Stack MERN Journey",
      description: "The ultimate path to becoming a professional Full-Stack developer using the MERN stack.",
      courses: [course1._id, course2._id],
      quicks: [quick1._id, quick2._id],
      difficulty: "Intermediate",
      instructor: instructor._id,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    });

    console.log("Sample data seeded successfully!");
    console.log("Created Skill Roadmap ID:", skillPath._id);
    
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
