# IngyinLearn - Skill Sharing Platform

IngyinLearn is a modern, gamified learning platform where anyone can be both a **Learner** and an **Instructor**. Master new skills through comprehensive courses and bite-sized "Quicks," while earning rewards and certifications.

## 🚀 Key Features

### 🎓 For Learners
- **Comprehensive Courses**: Browse and enroll in a wide variety of courses across different categories.
- **Learning Quicks**: Engage with micro-learning content designed for quick consumption and high retention.
- **Rewarding System**: Earn points for completing Quicks and collect badges to showcase your expertise.
- **Personal Dashboard**: Track your enrollments, points, and earned badges in one place.

### 👨‍🏫 For Instructors
- **Course Creation**: Build and manage your own courses with a flexible curriculum structure.
- **Micro-Learning Management**: Create "Quicks" to share bite-sized knowledge and engage your audience.
- **Student Analytics**: Monitor student progress and interaction with your content.
- **Unified Profile**: Seamlessly switch between learning and teaching views with a single account.

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, Lucide React, Vite.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Authentication.
- **Styling**: Vanilla CSS & Tailwind CSS for a premium, responsive UI.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SkillShare
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGODB_URL=your_mongodb_connection_string
   # JWT_KEY=your_secret_key
   npm run start
   ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   # Create a .env file with:
   # VITE_SERVER_URL=http://localhost:5000
   npm run dev
   ```

## 🔄 Dual-Role System

IngyinLearn removes the barrier between learners and teachers. Every account is automatically granted both learner and instructor capabilities.
- Use the **Dashboard Switcher** in the Navigation Bar to jump between your roles.
- Earn badges while you learn, and build your reputation while you teach!

---
Built with ❤️ by the IngyinLearn Team.
