import React from "react";
import { FaHome, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../../hooks/useAdmin";
import useInstructor from "../../../../hooks/useInstructor";
import useAuth from "../../../../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  // const isAdmin = true;
  const [isInstructor] = useInstructor();
  // const isInstructor = true;
  // const {user} = useAuth()

  return (
    <div className="flex">
      <ul className="menu p-4 w-80 bg-slate-400 text-black">
        {isAdmin && (
          <>
            <li>
              <NavLink to="/dashboard/manageclasses">
                <FaWallet /> Manage course
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/allusers">
                <FaUsers /> All Users
              </NavLink>
            </li>
          </>
        )}
        {isInstructor && (
          <>
            <li>
              <NavLink to="/dashboard/addcourse">
                <FaUtensils /> Add a course
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/instructorclasses">
                <FaUtensils /> My Classes
              </NavLink>
            </li>
          </>
        )}
        {!isAdmin && !isInstructor && (
            <>
              <li>
                <NavLink to="/dashboard/enrolled">
                  <FaHome /> My Enrolled Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaHome /> My Cart
                </NavLink>
              </li>
            </>
          )}

        <div className="divider"></div>
        <li>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Dashboard;
