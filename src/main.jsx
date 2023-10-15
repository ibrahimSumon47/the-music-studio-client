import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Home from "./components/Pages/Home/Home/Home.jsx";
import Login from "./components/Pages/Login/Login.jsx";
import Register from "./components/Pages/Register/Register.jsx";
import AuthProvider from "./components/providers/AuthProvider.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import AllUsers from "./components/Pages/Dashboard/AllUsers/AllUsers.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./components/Pages/Dashboard/Dashboard/Dashboard.jsx";
import AddACourse from "./components/Pages/Dashboard/Instructor/AddACourse/AddACourse.jsx";
import Classes from "./components/Pages/Dashboard/Classes/Classes.jsx";
import StudentHome from "./components/Pages/Dashboard/StudentHome/StudentHome.jsx";
import AdminRoute from "./components/route/AdminRoute.jsx";
import MyClasses from "./components/Pages/Dashboard/Instructor/MyClasses/MyClasses.jsx";
import ManageClasses from "./components/Pages/Dashboard/ManageClasses/ManageClasses.jsx";
import Enrolled from "./components/Pages/Dashboard/StudentHome/Enrolled.jsx";
import MyCart from "./components/Pages/Dashboard/StudentHome/MyCart.jsx";
import Payment from "./components/Pages/Dashboard/StudentHome/Payment/Payment.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Instructors from "./components/Pages/Instructors/Instructors.jsx";
import Feedback from "./components/Pages/Dashboard/ManageClasses/Feedback.jsx";
import About from "./components/Pages/Home/Home/About/About.jsx";
import Reviews from "./components/Pages/Home/Reviews/Reviews.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { 
        path: "/about", 
        element: <About /> 
      },
      { 
        path: "/reviews", 
        element: <Reviews /> 
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageclasses/feedback",
        element: <Feedback />,
      },
      {
        path: "/dashboard/instructorclasses",
        element: <MyClasses />,
      },
      {
        path: "/dashboard/addcourse",
        element: <AddACourse />,
      },
      {
        path: "/dashboard/studenthome",
        element: <StudentHome />,
      },
      {
        path: "/dashboard/enrolled",
        element: <Enrolled />,
      },
      {
        path: "/dashboard/mycart",
        element: <MyCart />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-2xl mx-auto font-poppins">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
