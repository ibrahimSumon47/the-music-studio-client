import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";
import { FaPersonBooth, FaTrashAlt, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [user, setUser] = useState()
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const updateUserRole = (user, role) => {
    fetch(`https://the-music-studio-server.vercel.app/users/${role}/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now a ${role.charAt(0).toUpperCase() + role.slice(1)}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeAdmin = (user) => {
    updateUserRole(user, "admin");
  };

  
  const handleMakeInstructor = (user) => {
    updateUserRole(user, "instructor");
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`https://the-music-studio-server.vercel.app/users/${user._id}`)
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", `${user.displayName} has been deleted.`, "success");
              const remaining = user.filter((user) => user._id !== id);
              setUser(remaining);
            }
          });
      }
    });
  };

  
  return (
    <div className="max-w-screen-xl mx-auto my-auto">
      <h2 className="text-3xl font-semibold text-center">
        Total Users: {users.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-2xl">
          {/* head */}
          <thead>
            <tr className="text-2xl">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-green-600 text-white"
                      >
                        <FaUserShield />
                      </button>
                    </>
                  )}
                </td>
                <td>{user.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn bg-blue-600 text-white"
                      >
                        <FaPersonBooth/>
                      </button>
                    </>
                  )}</td>
                <td>
                  <button
                    className="btn bg-red-600 text-white"
                    onClick={() => handleDelete(user)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
