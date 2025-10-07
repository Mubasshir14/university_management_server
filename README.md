

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
   git clone https://github.com/Mubasshir14/university_management_server.git
   ```
   ```bash
   cd university_management_server
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

    # Email Verification
    CLIENT_URL=http://localhost:3000

    # Cloudinary (Media Upload)
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret

    # For Nodemailer
    FROM_EMAIL= SENDER_EMAIL
    FROM_PASS= PASSWORD

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

- **Deploy To Vercel:**
  ```bash
  vercel --prod
  ```

## Folder Structure
```
university_management_server/
📦src
 ┣ 📂app
 ┃ ┣ 📂builder
 ┃ ┃ ┗ 📜QueryBuilder.ts
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜AppError.ts
 ┃ ┃ ┣ 📜handleCastError.ts
 ┃ ┃ ┣ 📜handleDuplicateError.ts
 ┃ ┃ ┣ 📜handleValidationError.ts
 ┃ ┃ ┗ 📜handleZodError.ts
 ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜error.ts
 ┃ ┃ ┣ 📜index.d.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜bodyParse.ts
 ┃ ┃ ┣ 📜clientInfoParser.ts
 ┃ ┃ ┣ 📜globalErrorhandler.ts
 ┃ ┃ ┣ 📜notFound.ts
 ┃ ┃ ┗ 📜validateRequest.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜express.d.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜catchAsync.ts
 ┃ ┃ ┣ 📜cloudinary.config.ts
 ┃ ┃ ┣ 📜multer.config.ts
 ┃ ┃ ┣ 📜sendEmails.ts
 ┃ ┃ ┣ 📜sendResponse.ts
 ┃ ┃ ┗ 📜sendUserVerificationEmail.ts
 ┣ 📂modules
 ┃ ┣ 📂AcademicDepartment
 ┃ ┃ ┣ 📜academicDepartment.controller.ts
 ┃ ┃ ┣ 📜academicDepartment.interface.ts
 ┃ ┃ ┣ 📜academicDepartment.model.ts
 ┃ ┃ ┣ 📜academicDepartment.route.ts
 ┃ ┃ ┣ 📜academicDepartment.service.ts
 ┃ ┃ ┣ 📜academicDepartment.validation.ts
 ┃ ┃ ┗ 📜academicDepartmets.constant.ts
 ┃ ┣ 📂AcademicSession
 ┃ ┃ ┣ 📜academicSession.constant.ts
 ┃ ┃ ┣ 📜academicSession.controller.ts
 ┃ ┃ ┣ 📜academicSession.interface.ts
 ┃ ┃ ┣ 📜academicSession.model.ts
 ┃ ┃ ┣ 📜academicSession.route.ts
 ┃ ┃ ┣ 📜academicSession.service.ts
 ┃ ┃ ┗ 📜academicSession.validation.ts
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┣ 📜auth.interface.ts
 ┃ ┃ ┣ 📜auth.route.ts
 ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┣ 📜auth.utils.ts
 ┃ ┃ ┗ 📜auth.validation.ts
 ┃ ┣ 📂Course
 ┃ ┃ ┣ 📜course.constant.ts
 ┃ ┃ ┣ 📜course.controller.ts
 ┃ ┃ ┣ 📜course.interface.ts
 ┃ ┃ ┣ 📜course.model.ts
 ┃ ┃ ┣ 📜course.route.ts
 ┃ ┃ ┣ 📜course.service.ts
 ┃ ┃ ┗ 📜course.validation.ts
 ┃ ┣ 📂Faculty
 ┃ ┃ ┣ 📜faculty.constant.ts
 ┃ ┃ ┣ 📜faculty.controller.ts
 ┃ ┃ ┣ 📜faculty.interface.ts
 ┃ ┃ ┣ 📜faculty.model.ts
 ┃ ┃ ┣ 📜faculty.route.ts
 ┃ ┃ ┣ 📜faculty.service.ts
 ┃ ┃ ┣ 📜faculty.validation.ts
 ┃ ┃ ┗ 📜generateFacultyId.ts
 ┃ ┣ 📂Registration
 ┃ ┃ ┣ 📜registration.controller.ts
 ┃ ┃ ┣ 📜registration.interface.ts
 ┃ ┃ ┣ 📜registration.model.ts
 ┃ ┃ ┣ 📜registrstion.route.ts
 ┃ ┃ ┗ 📜registrstion.sservice.ts
 ┃ ┣ 📂Result
 ┃ ┃ ┣ 📜result.constant.ts
 ┃ ┃ ┣ 📜result.controller.ts
 ┃ ┃ ┣ 📜result.iterface.ts
 ┃ ┃ ┣ 📜result.model.ts
 ┃ ┃ ┣ 📜result.routes.ts
 ┃ ┃ ┣ 📜result.service.ts
 ┃ ┃ ┗ 📜result.utils.ts
 ┃ ┣ 📂Student
 ┃ ┃ ┣ 📜generateStudentId.ts
 ┃ ┃ ┣ 📜student.constant.ts
 ┃ ┃ ┣ 📜student.controller.ts
 ┃ ┃ ┣ 📜student.interface.ts
 ┃ ┃ ┣ 📜student.model.ts
 ┃ ┃ ┣ 📜student.route.ts
 ┃ ┃ ┣ 📜student.service.ts
 ┃ ┃ ┗ 📜student.validation.ts
 ┃ ┣ 📂StudentID
 ┃ ┃ ┣ 📜studentid.controller.ts
 ┃ ┃ ┣ 📜studentid.interface.ts
 ┃ ┃ ┣ 📜studentid.model.ts
 ┃ ┃ ┣ 📜studentid.route.ts
 ┃ ┃ ┗ 📜studentid.service.ts
 ┃ ┗ 📂User
 ┃ ┃ ┣ 📜user.constant.ts
 ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┣ 📜user.interface.ts
 ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┣ 📜user.route.ts
 ┃ ┃ ┣ 📜user.service.ts
 ┃ ┃ ┗ 📜user.validation.ts
 ┣ 📜app.ts
 ┗ 📜server.ts
 ```

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---