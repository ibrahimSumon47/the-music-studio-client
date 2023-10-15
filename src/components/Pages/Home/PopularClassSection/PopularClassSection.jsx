import React from "react";
import useAxiosSecure from "../../Dashboard/AllUsers/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import Heading from "../../../Heading/Heading";

const PopularClassSection = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [, refetch] = useCart();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Sort classes by enrollment count in descending order
  const sortedCourses = courses.sort(
    (a, b) => b.enrollmentCount - a.enrollmentCount
  );

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

  const popularCourses = sortedCourses.slice(0, 6);
  return (
    <div>
      <Heading heading="Popular Classes"></Heading>
      <div className="mb-10 grid grid-cols-1 mx-7 md:mx-8 lg:mx-0 gap-y-20 md:grid-cols-2 md:gap-x-36 lg:grid-cols-3 lg:gap-x-48">
        {popularCourses.map((course) => (
          <div className="grid grid-cols-2">
            <div
              key={course._id}
              className={`card w-96 bg-white text-black shadow-xl ${
                course.seats === 0 ? "bg-red-500" : ""
              }`}
            >
              <figure>
                <img className="h-[300px] w-full" src={course.photo} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{course.className}</h2>
                <p>Instructor Name: {course.instructorName}</p>
                <p>Instructor Email: {course.instructorEmail}</p>
                {/* <p>{course.details}</p> */}

                <p>Avilable Seats: {course.seats}</p>
                <p>Price: ${course.price}</p>

                <p>
                  <b>Enrolled Students: </b>
                  {!course?.enrolled ? 0 : course?.enrolled}
                </p>
              </div>
              <button
                onClick={() => handleEnroll(course)}
                className={`btn btn-success hover:bg-green-700 ${
                  course.seats === 0 ? "hidden" : ""
                }`}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PopularClassSection;
