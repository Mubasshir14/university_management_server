

## University Management System – A Complete Academic Solution

Welcome to our comprehensive **University Management System**, designed to streamline and digitize the entire academic and administrative process of a university.

This platform offers an all-in-one solution with the following core features:

### 📚 Key Modules

- **Home Page:** Overview of the university, featuring details about faculties, departments, academic achievements, and admission programs.
- **Dashboards:** Role-based dashboards for:
  - **Admin**
  - **Users**
  - **Students**

### 📝 Student Admission & Registration

- Students can apply for admission by filling out an application form.
- The **Admin** reviews and approves applications.
- After approval, students can complete their registration by selecting their desired:
  - **Department**
  - **Academic Semester** (Spring, Summer, or Fall)
- During registration, students can:
  - Select courses within the **minimum and maximum credit limit**
  - Drop a course later if necessary

### 🧑‍💼 Admin Functionalities

- Add/edit **Departments**, **Faculties**, and **Semesters**
- Approve student **admissions** and **course registrations**
- View students based on:
  - **Courses**
  - **Departments**
  - **Semesters**
- Assign and manage **Course Advisors**

This system is built to ensure a smooth and transparent academic journey for students while providing efficient tools for university staff and administrators.



## 🔐 Technologies & Tools Used

### 🧠 Core Technologies
- **TypeScript**: For strong typing and enhanced developer experience.
- **Express.js**: For creating the server and APIs.
- **MongoDB**: For database management using Mongoose.
- **Mongoose**: For MongoDB object modeling.
- **Cloudinary**: Cloud-based media storage and management.
- **Zod**: Schema validation with static type inference.

### ⚙️ Developer Utilities

- **Environment Variables**: Managed with `dotenv`.
- **Linting and Formatting**: Using ESLint and Prettier.
- **Development Server**: Powered by `ts-node-dev` for live reload.

### 🔐 Authentication & Security
- **jsonwebtoken (JWT)** – For secure authentication using tokens.
- **cors** – Cross-Origin Resource Sharing control.

- **ua-parser-js** – Detect and parse user device/browser info.

### 📤 File & Media Uploads
- **multer** – Handle multipart/form-data (file uploads).
- **multer-storage-cloudinary** – Upload files directly to Cloudinary.

### ✉️ Communication

- **nodemailer** – Send emails from your server.

### 📦 HTTP Utilities
- **http-status / http-status-codes** – Standard HTTP status code constants and helpers.


## Prerequisites
Make sure you have the following installed:
- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
   ```bash
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
    # Environment
    NODE_ENV=development
    PORT=5000

    # Database
    DATABASE_URL=your-mongodb-uri

    # Security
    BCRYPT_SALT_ROUND=your-salt-round

    # JWT Secrets
    JWT_ACCESS_SECRET=your-access-token-secret
    JWT_REFRESH_SECRET=your-refresh-token-secret
    JWT_ACCESS_EXPIRES_IN=10d
    JWT_REFRESH_EXPIRES_IN=365d

    # Password Reset
    RESET_PASSWORD_UI_LINK=http://localhost:5000

    # Cloudinary (Media Upload)
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret

   ```

## Scripts

- **Start Development Server:**
  ```bash
  npm run start:dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm run start:prod
  ```

- **Lint Code:**
  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**
  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**
  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

## Folder Structure
```
university_management_server/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── handleZodError.ts
│   │   │   └── handleCastError.ts
│   │   ├── interface/
│   │   │   ├── events.ts
│   │   │   └── index.d.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   └── globalErrorHandler.ts
│   │   ├── route/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── CatchAsync.ts
│   │   │   └── sendResponse.ts
│   ├── module/
│   │   ├── Auth/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── AcademicDepartment/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── AcademicSemester/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Course/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Faculty/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Registration/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Student/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── User/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   ├── app.ts
│   ├── server.ts
│   ├── Uploads
├── dist/                   # Compiled JavaScript files
├── .env                    # Environment variables
├── .eslintrc.config.mjs            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```



## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---