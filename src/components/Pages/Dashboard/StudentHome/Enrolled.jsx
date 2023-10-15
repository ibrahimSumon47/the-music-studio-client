import React, { useEffect, useState } from "react";
import useAxiosSecure from "../AllUsers/useAxiosSecure";

const Enrolled = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/enrolled")
      .then((res) => {
        setEnrolledCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-2/3 mx-auto mt-10">
      <h2 className="text-center font-bold text-4xl mb-5">My Enrolled Courses</h2>
      <table className="">
        <thead>
          <tr className=" text-white uppercase text-center">
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Course Name</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Transaction ID</th>
          </tr>
        </thead>
        <tbody className="text-white font-light">
          {enrolledCourses.map((course,index) => (
            <tr
              key={course.transactionId}
              className="border-b border-gray-200 py-10"
            >
              <td className="py-3 px-6 text-left ">
                {index+1}
              </td>
              <td className="py-3 px-6 text-left ">
                {course.courseName}
              </td>
              <td className="py-3 px-6 text-left ">
                {course.price}
              </td>
              <td className="py-3 px-6 text-left">
                {course.transactionId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrolled;
