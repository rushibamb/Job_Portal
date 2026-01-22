# Job Portal – MERN Stack (Industry Project)

A modern, full-stack job portal application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). This project simulates a real-world hiring platform where users can apply for jobs, recruiters can post jobs, and applications can be tracked efficiently.

## 🚀 Features

### For Job Seekers
- User authentication and profile management
- Browse and search job listings
- Apply for jobs with resume upload
- Track application status
- View job descriptions and company details
- Filter jobs by category and location

### For Recruiters
- Company profile management
- Post and manage job listings
- View and manage job applications
- Update application status (pending, accepted, rejected)
- Dashboard for managing companies and jobs

## 📁 Project Structure

```
Job Portal/
├── backend/                    # Node.js/Express Backend
│   ├── controllers/           # Route controllers
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middlewares/          # Custom middlewares
│   │   ├── isAuthinticated.js
│   │   └── multer.js
│   ├── models/               # MongoDB Mongoose models
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── utils/                # Utility functions
│   │   ├── cloudinary.js     # Cloudinary configuration
│   │   ├── datauri.js        # File handling utilities
│   │   └── db.js             # MongoDB connection
│   ├── index.js              # Express server entry point
│   ├── package.json
│   └── jsconfig.json
│
├── frontend/                  # React Frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── admin/       # Admin/Recruiter components
│   │   │   │   ├── AdminJobs.jsx
│   │   │   │   ├── AdminJobsTable.jsx
│   │   │   │   ├── Applicants.jsx
│   │   │   │   ├── ApplicantsTable.jsx
│   │   │   │   ├── Companies.jsx
│   │   │   │   ├── CompaniesTable.jsx
│   │   │   │   ├── CompanyCreate.jsx
│   │   │   │   ├── CompanySetup.jsx
│   │   │   │   ├── PostJob.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── auth/        # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── shared/      # Shared components
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── ui/          # UI components (shadcn/ui)
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── carousel.jsx
│   │   │   │   ├── dialog.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   ├── popover.jsx
│   │   │   │   ├── radio-group.jsx
│   │   │   │   ├── select.jsx
│   │   │   │   ├── sonner.jsx
│   │   │   │   └── table.jsx
│   │   │   ├── utils/       # Utility components
│   │   │   │   └── constant.js
│   │   │   ├── AppliedJobTable.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── CategoryCarousel.jsx
│   │   │   ├── FilterCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Job.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── LatestJobCards.jsx
│   │   │   ├── LatestJobs.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── UpdateProfileDialog.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useGetAllAdminJobs.jsx
│   │   │   ├── useGetAllJobs.jsx
│   │   │   ├── useGetAppliedJobs.jsx
│   │   │   ├── useGetCompanyById.jsx
│   │   │   └── usegetAllCompanies.jsx
│   │   ├── redux/           # Redux store and slices
│   │   │   ├── applicationSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── companySlice.js
│   │   │   ├── jobSlice.js
│   │   │   └── store.js
│   │   ├── lib/             # Library utilities
│   │   │   └── utils.js
│   │   ├── App.jsx          # Main App component
│   │   ├── App.css
│   │   ├── main.jsx         # React entry point
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── components.json      # shadcn/ui configuration
│
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - File storage (resumes, images)
- **Multer** - File upload handling
- **Cookie Parser** - Cookie management
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **Framer Motion** - Animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for file storage)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rushibamb/Job_Portal.git
cd Job_Portal
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Start the backend server
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Update API endpoints (if needed)
Check `frontend/src/components/utils/constant.js` and update the API endpoints if your backend is running on a different port:

```javascript
export const USER_API_END_POINT = "http://localhost:5000/api/v1/user";
export const JOB_API_END_POINT = "http://localhost:5000/api/v1/job";
export const APPLICATION_API_END_POINT = "http://localhost:5000/api/v1/application";
export const COMPANY_API_END_POINT = "http://localhost:5000/api/v1/company";
```

#### Start the development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🌐 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /profile` - Get user profile
- `PUT /update` - Update user profile
- `POST /resume` - Upload resume

### Company Routes (`/api/v1/company`)
- `POST /create` - Create company (Recruiter only)
- `GET /get` - Get all companies
- `GET /:id` - Get company by ID
- `PUT /:id/update` - Update company details

### Job Routes (`/api/v1/job`)
- `POST /post` - Post a new job (Recruiter only)
- `GET /get` - Get all jobs
- `GET /:id` - Get job by ID
- `GET /search` - Search jobs

### Application Routes (`/api/v1/application`)
- `POST /apply/:id` - Apply for a job
- `GET /get` - Get user's applied jobs
- `GET /:id/applicants` - Get applicants for a job (Recruiter only)
- `POST /status/:id/update` - Update application status (Recruiter only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security.

### User Roles
- **Job Seeker** - Can browse jobs, apply, and manage profile
- **Recruiter** - Can post jobs, manage companies, and view applications

## 📝 Environment Variables

### Backend `.env` File

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/jobportal
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Running the Application

### Development Mode

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

#### Start Backend (Production)
```bash
cd backend
node index.js
```

## 🧪 Testing

Currently, the application doesn't include automated tests. Manual testing can be done through the UI.

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
The backend is ready for production. You can use process managers like PM2:

```bash
npm install -g pm2
pm2 start backend/index.js --name job-portal-api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rushi Bamb**

- GitHub: [@rushibamb](https://github.com/rushibamb)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful UI components
- Vite team for the amazing build tool
- All the open-source contributors whose packages made this project possible

---

**Note:** Make sure to set up your environment variables correctly before running the application. The application requires MongoDB and Cloudinary to function properly.
