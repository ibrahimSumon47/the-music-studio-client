import React, { useEffect, useState } from "react";
import useAxiosSecure from "../AllUsers/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";

const Classes = ({ course }) => {
  const [axiosSecure] = useAxiosSecure();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();
  const fetchCourses = async () => {
    const response = await axiosSecure.get("/courses");
    return response.data;
  };
  const {
    data: courses,
    isLoading,
    queryClient,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/approved`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sliceDetails = (details, maxLength) => {
    if (details.length > maxLength) {
      return details.slice(0, maxLength) + "...";
    }
    return details;
  };

  const handleEnroll = (course) => {
    if (user && user.email) {
      const courseEnroll = {
        courseId: course._id,
        photo: course.photo,
        className: course.className,
        instructorName: course.instructorName,
        seats: course.seats,
        price: course.price,
        email: user.email,
      };
      fetch("https://the-music-studio-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(courseEnroll),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              title: "Added to cart",
              position: "top-end",
              icon: "success",
              showConfirmButton: "false",
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to enroll course",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        }
      });
    }
  };
  return (
    <div className="my-10">
      <h2 className="text-center my-10 text-4xl font-bold">
        All Classes: {courses.length}
      </h2>
      <div className="grid grid-cols-1 mx-8 gap-y-10 md:grid-cols-2 md:mx-8 md:gap-x-40 lg:grid-cols-3 lg:mx-0 lg:gap-x-48">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card w-96 bg-white text-black shadow-xl"
          >
            <figure>
              <img className="h-[300px] w-full" src={course.photo} alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.className}</h2>
              <p>Instructor Name: {course.instructorName}</p>
              <p>Instructor Email: {course.instructorEmail}</p>
              {/* <p>{course.details}</p> */}
              <div className="flex">
                <p>Available Seats: {course.seats}</p>
                <p>Price: ${course.price}</p>
              </div>
              <p>Enrolled: {course.enrolled}</p>
            </div>
            <button
              onClick={() => handleEnroll(course)}
              className="btn btn-primary rounded-none"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
