import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Routes
import Signup from "./routes/auth/Signup";
import Login from "./routes/auth/Login";

// Admin Routes
import AdminLayout from "./routes/admin/AdminPannel";
import AddCourse from "./routes/admin/AddCourse";
import ShowCourses from "./routes/admin/ShowCourses";

// Student/User Routes
import Dashboard from "./routes/student/Dashboard";
import Courses from "./routes/student/Courses";
import CourseDetail from "./routes/student/CourseDetail";

// Misc
import NotFound from "./routes/NotFound";
import CoursePlayerPage from "./routes/student/CoursePlayerPage";
import ProfilePage from "./routes/student/ProfilePage";
import EditCourse from "./routes/admin/EditCourse";
import Logout from "./routes/auth/LogoutRoute";
import SearchResultsPage from "./routes/student/SearchResult";
import Home from "./routes/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
           <Home/>
          }
        />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />


        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/courses" element={<ShowCourses />} />
        <Route path="/admin/addcourse" element={<AddCourse />} />
        <Route path="/admin/editcourse/:id" element={<EditCourse />} />

        {/* Student / User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/our-courses" element={<Courses />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/my-course/:id" element={<CoursePlayerPage />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
