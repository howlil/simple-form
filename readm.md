# Responsive Form Application with Backend API

This project is a full-stack application that includes a **responsive form frontend** deployed on **Vercel**, and a **backend API** deployed on **Google Cloud Run** using **Docker**. The application allows users to fill out a form, validate the input data, and submit it to the backend. The form data is then displayed on a success page.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Approach to Responsive Design](#approach-to-responsive-design)
4. [Form Validation](#form-validation)
5. [Reusable Components](#reusable-components)
6. [CSS Animations](#css-animations)
7. [API Design](#api-design)
8. [Deployment](#deployment)
9. [Getting Started](#getting-started)
10. [Future Improvements](#future-improvements)

---

## Features

- **Responsive design** that adjusts seamlessly across devices (mobile, tablet, desktop).
- **Form validation** with at least 6 fields, ensuring data integrity.
- **Reusable components** for form fields and buttons.
- **CSS animations** to enhance the user experience.
- **Backend API** to process form data, deployed on Google Cloud Run.
- **Frontend** deployed on Vercel.

---

## Tech Stack

### Frontend:

- Framework: **React** (deployed on Vercel)
- Styling: **CSS Modules** with **Glassmorphism** and **Monochromatic theme**
- Data fetching: **Axios**

### Backend:

- Runtime: **Node.js** (deployed using Docker on Google Cloud Run)
- API management: **Express.js**
- Persistence: **`data.json`** (read-only data)
- Deployment: **Google Cloud Run** with Docker

---

## Approach to Responsive Design

The design uses **mobile-first design** principles with **CSS media queries** to adjust the layout based on screen size. The design ensures the application works seamlessly on mobile, tablet, and desktop.

### Key Points:

- **Mobile-first**: Initial design targets smaller screens and scales up for larger ones.
- **Media queries**: Applied at breakpoints for tablets (`768px`) and desktops (`1024px`).
- **Glassmorphism**: Used to create a modern, elegant visual style with blurred, frosted backgrounds.
- **Consistent usability**: Ensured through clear, intuitive form controls and responsive typography.

---

## Form Validation

The form includes the following fields:

1. **Name**: Alphabetic characters only (no numbers or symbols).
2. **Email**: Must be a valid email format.
3. **Phone**: Must be a 10-digit number.
4. **Password**: At least 8 characters, containing uppercase, lowercase, numbers, and symbols.
5. **Age**: Must be an integer between 18 and 100.
6. **Address**: Must not be empty.

### Backend Validation:

Additional validation is performed in the backend using **Express.js** with **express-validator** to ensure data integrity. Validation errors are returned if any of the fields do not meet the validation criteria.

---

## Reusable Components

The project follows **DRY principles** by using reusable components like:

1. **FormField Component**: Handles form inputs with floating labels.
2. **Button Component**: Standard button used across the form and success page.

These components can be reused across multiple pages.

```javascript
<FormField
  label="Name"
  type="text"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

## CSS Animations

To improve the user experience, the following **CSS animations** were implemented:

- **Fade-in effect**: Smooth fade-in effect for the form container when loaded.
- **Hover effects**: Interactive hover effects on buttons and input fields.
- **Transition on focus**: Floating labels move smoothly when the input is focused.

```css
@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(-20px); 
  }
  to { 
    opacity: 1;
    transform: translateY(0); 
  }
}

.input:focus ~ .label {
  top: -10px;
  font-size: 12px;
  transition: 0.2s ease-in-out;
}

```
## API Design
The backend API is built using Node.js and Express. It handles form submissions and provides data retrieval via the following endpoints:

### Endpoints:
- **POST /api/submit**: Accepts form data and performs validation. Returns success or error messages.
- **GET /api/submissions**: Retrieves a list of submitted form data, sorted by `dateSubmitted`, and returns the most recent submission.

### Backend Architecture:
- Dockerized backend using Google Cloud Run for scalability.
- **Validation**: Backend performs validation for fields like email format, phone number digits, and password strength using `express-validator`.

## Deployment

### Frontend on Vercel
The frontend is hosted on Vercel, optimized for static and server-rendered React applications. The backend URL is provided as an environment variable for API access.

- **Vercel Integration**: After pushing the frontend to GitHub, Vercel automatically builds and deploys the app.
- **Environment Variables**: Backend URL is stored in Vercel as an environment variable:

  ```bash
  REACT_APP_BACKEND_URL=https://your-cloud-run-url.run.app
  ```

### Backend on Google Cloud Run
The backend is containerized using Docker and deployed to Google Cloud Run.

#### Build Docker Image:

```bash
docker build -t my-backend-image .
docker tag my-backend-image gcr.io/[PROJECT_ID]/my-backend-image
docker push gcr.io/[PROJECT_ID]/my-backend-image
```

#### Deploy to Cloud Run:

```bash
gcloud run deploy my-backend \
  --image gcr.io/[PROJECT_ID]/my-backend-image \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
```

### Install Dependencies
Navigate to the project directory and install the necessary dependencies:

```bash
cd your-repo
npm install
```

### Run the Backend Locally
Start the backend server:

```bash
npm start
```
The backend will be accessible at `http://localhost:8080`.

### Build and Run the Frontend
To build and run the frontend locally:

```bash
npm run build
npm start
```
The frontend will be accessible at `http://localhost:3000`.

### Environment Variables
Set the following environment variables in `.env` or in Vercel settings:

```bash
REACT_APP_BACKEND_URL=https://your-cloud-run-url.run.app
```
This connects the frontend to the backend API hosted on Google Cloud Run.

## Future Improvements
- **Database Integration**: Instead of using `data.json`, a real database such as MongoDB or PostgreSQL should be integrated for persistent storage.
- **User Authentication**: Implement user authentication for better security.
- **Error Handling**: Improve error handling in both frontend and backend.
- **Testing**: Add unit and integration tests using Jest or Mocha for backend, and React Testing Library for frontend.

