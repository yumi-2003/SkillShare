const mongoose = require("mongoose");
const Quick = require("../models/quick");
const Category = require("../models/category");
require("dotenv").config();

async function seedQuicks() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database...");

    const categories = await Category.find();
    const getCatId = (name) => categories.find(c => c.name === name)?._id;

    const moreQuicks = [
      {
        title: "Flexbox Layout Magic",
        description: "Master CSS Flexbox in 3 minutes with these essential properties.",
        category: getCatId("Frontend Development"),
        points: 15,
        content: "Flexbox is a one-dimensional layout model. Use 'flex-direction' to set the axis and 'justify-content' for alignment.",
        videoUrl: "https://www.youtube.com/watch?v=k32voq7M6uo"
      },
      {
        title: "Git Rebase vs Merge",
        description: "Understand when to use rebase vs merge for a cleaner git history.",
        category: getCatId("Development"),
        points: 25,
        content: "Merge preserves history as is, while Rebase rewrites it for a linear look. Use rebase for local cleanup, merge for shared branches.",
      },
      {
        title: "REST vs GraphQL",
        description: "A quick comparison of API architectures.",
        category: getCatId("Backend Development"),
        points: 20,
        content: "REST has multiple endpoints and can over-fetch. GraphQL has one endpoint and lets clients define data shapes.",
      },
      {
        title: "UX: The 10 Usability Heuristics",
        description: "Nielsen's 10 golden rules for interface design.",
        category: getCatId("UI/UX Design"),
        points: 30,
        content: "1. Visibility of system status. 2. Match between system and the real world. 3. User control and freedom...",
      },
      {
        title: "Async/Await Best Practices",
        description: "Writing cleaner asynchronous code in JavaScript.",
        category: getCatId("Programming Fundamentals"),
        points: 15,
        content: "Always wrap in try/catch. Avoid 'await' inside loops where possible; use Promise.all instead.",
      },
      {
        title: "Python List Comprehensions",
        description: "Write more Pythonic and concise code.",
        category: getCatId("Programming Fundamentals"),
        points: 10,
        content: "Syntax: [new_item for item in list if condition]. It's faster and more readable than standard loops.",
      },
      {
        title: "MongoDB Indexing Basics",
        description: "Speed up your queries with proper indexing.",
        category: getCatId("Database Systems"),
        points: 25,
        content: "Indexes support the efficient execution of queries in MongoDB. Without them, MongoDB must perform a collection scan.",
      },
      {
        title: "The Box Model in CSS",
        description: "Content, Padding, Border, Margin explained.",
        category: getCatId("Frontend Development"),
        points: 10,
        content: "Every element is a box. 'box-sizing: border-box' makes height and width include padding and border.",
      }
    ];

    // Filter out entries with undefined categories
    const validQuicks = moreQuicks.filter(q => q.category);

    if (validQuicks.length < moreQuicks.length) {
      console.warn(`Skipped ${moreQuicks.length - validQuicks.length} quicks due to missing category names in DB.`);
    }

    await Quick.insertMany(validQuicks);
    console.log(`Successfully added ${validQuicks.length} new Quicks!`);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedQuicks();
