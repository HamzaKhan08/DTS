# Document Tracking System

A full-featured Document Tracking System built with a client-server architecture. This application ensures secure, role-based document approval, real-time tracking, and robust admin control.

## 📁 Project Structure

project-root/
├── client/ # Frontend (React/Next.js)
└── server/ # Backend (Node.js, Express, MongoDB)

markdown
Copy
Edit

## 🚀 Features

- 🗂️ Document upload and tracking
- 🧑‍💼 Role-based access control
- 🔐 Secure login with JWT authentication
- 📄 Real-time approval/rejection workflow
- 🧾 Document metadata (uploader, status, timestamps)
- 🔍 Inline document viewer
- 📊 Admin dashboard with full user control
- 🛑 Rejection rollback functionality
- 📥 Logs and audit trails
- 📧 Email notifications (optional)

## 🔧 Tech Stack

- **Frontend**: React / Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Deployment**: (optional) Vercel, Heroku, or AWS

## 🛠️ Setup Instructions

### Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
Setup the client
bash
Copy
Edit
cd client
npm install
npm start  # or npm run dev
Setup the server
bash
Copy
Edit
cd ../server
npm install
npm run start  # or npm run dev
Make sure you have MongoDB running locally or use MongoDB Atlas.

📜 License
This project is licensed under the MIT License.

sql
Copy
Edit
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
