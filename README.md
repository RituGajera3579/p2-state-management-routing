**Personal Portfolio & Task Manager**

A full-stack web application that combines a personal portfolio website with a Task Management System. The project demonstrates React components, routing, lazy loading, API integration, task management, and backend performance optimization.
📌 Project Overview
The Personal Portfolio showcases academic background, technical skills, and projects.

The Task Manager allows users to create, view, update, complete, and delete tasks. The application uses React for the frontend and Node.js, Express, and MongoDB for backend operations.
✨ Features
🏠 Home Page
- Personal introduction and portfolio navigation.
- About Me section.
- Technical skills display.
- Featured projects.
👩‍💻 About Page
- Academic background and technical competencies.
- Programming languages and development skills.
- GitHub API integration to display public repositories.
- Repository information including stars, forks, and programming languages.
📋 Task Manager
- Display all tasks.
- Create new tasks with title, description, and priority.
- Edit existing tasks.
- Mark tasks as completed.
- Delete tasks.
- Task priority levels: Low, Medium, and High.
- Task description generation for demonstration.
📩 Contact Page
- Contact information.
- Message form.
- Name, email, subject, and message fields.
- Input validation and success feedback.
- Live message preview.
⚡ Performance Optimization
- React Lazy Loading using React.lazy().
- Suspense loading fallback.
- Route-based code splitting.
- Backend task caching using NodeCache.
- EventEmitter for task-created events.
🛠️ Technologies Used
Technology	Purpose
React 19	Frontend development
React Router DOM 7	Routing and navigation
Vite	Development server and build tool
Node.js	Backend runtime
Express.js	REST API
MongoDB	Database
Mongoose	Database modeling
NodeCache	In-memory caching
EventEmitter	Event handling
Docker	Containerization
Git & GitHub	Version control

📂 Project Structure
p2-state-management-routing/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── events/
│   │   └── taskEvents.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── tests/
│   │   └── app.test.js
│   ├── cache.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── NavBar.jsx
│   │   ├── RepoList.jsx
│   │   ├── Skills.jsx
│   │   └── Spinner.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── vite.config.js
└── README.md


🚀 Installation and Setup
Prerequisites
- Node.js
- npm
- MongoDB
1. Clone the Repository
git clone https://github.com/RituGajera3579/p2-state-management-routing.git


2. Navigate to the Project
cd p2-state-management-routing


3. Install Frontend Dependencies
npm install


4. Start Frontend
npm run dev


The frontend development server will start using Vite.
5. Backend Setup
Open another terminal:
cd backend
npm install


Configure the required MongoDB connection details in the backend environment configuration.

Start the backend:
node server.js


🔄 Application Workflow
1. Users open the Home Page.
2. They explore the About Page and technical skills.
3. Users navigate to the Task Manager.
4. Tasks are fetched from the backend.
5. Users create, update, complete, and delete tasks.
6. Task data is stored in MongoDB.
7. Backend caching improves repeated task retrieval.
⚡ Lazy Loading
The application uses React Lazy Loading to load selected pages only when required.

React.lazy() loads the page component dynamically, while Suspense displays a loading fallback during loading.

This helps reduce the initial loading work and improves application performance.
🗄️ Backend Optimization
The backend uses NodeCache for temporary task caching.

EventEmitter is used to trigger task-created events.

These features demonstrate caching and event-driven backend processing.
🎯 Learning Outcomes
- React component development.
- React Router navigation.
- State management.
- Lazy loading and Suspense.
- REST API integration.
- Task CRUD operations.
- MongoDB integration.
- Backend caching.
- Event-driven programming.
- Docker-based application setup.
👩‍🎓 Developed By
Ritu Gajera

B.Tech Information Technology
🔗 GitHub Repository
Personal Portfolio & Task Manager
