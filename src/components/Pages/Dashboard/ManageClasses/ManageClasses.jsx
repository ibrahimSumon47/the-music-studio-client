import React, { useState } from "react";
import useAxiosSecure from "../AllUsers/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes,  } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const fetchCourses = async () => {
    const response = await axiosSecure.get("/courses");
    return response.data;
  };

  const {
    data: courses,
    isLoading,
    queryClient,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/pending`);
      return res.data;
    },
  });

  const updateCourseStatus = useMutation(
    (data)=>{
      return axiosSecure.patch(`/courses/admin/${data.courseId}`,{
        status:data.status
      })
    },
    {
      onSuccess:()=>{
        queryClient.invalidateQueries("courses")
      },
      onError:()=>{
        queryClient.invalidateQueries("courses")
      }
    }
  )

  const handleApprove = (courseId) => {
    updateCourseStatus.mutate({ courseId: courseId, status: "approved" });
    refetch();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Approved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleReject = (courseId) => {
    updateCourseStatus.mutate({ courseId: courseId, status: "rejected" });
    refetch();
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Rejected",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!courses || courses.length === 0) {
    return <div>No courses found.</div>;
  }


  return (
    <div>
      <h2 className="text-center my-10 text-4xl font-bold">
        Manage Classes: {courses.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center text-3xl text-white">
              <th>
                <label>#</label>
              </th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id} className="text-2xl w-full text-white">
                <td>
                  <label>{index + 1}</label>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={course.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{course.className}</div>
                    </div>
                  </div>
                </td>
                <td>{course.instructorName}</td>
                <td>{course.instructorEmail}</td>
                <td className="flex my-auto gap-5">
                  <button
                    onClick={() => handleApprove(course._id)}
                    className="btn btn-ghost bg-green-600 text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(course._id)}
                    className="btn btn-ghost bg-red-600 text-white"
                  >
                    Reject
                  </button>
                  <><button disabled
                    className="btn btn-ghost bg-warning text-white "
                  >
                    Feedback
                  </button></>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog></dialog>
    </div>
  );
};

export default ManageClasses;
