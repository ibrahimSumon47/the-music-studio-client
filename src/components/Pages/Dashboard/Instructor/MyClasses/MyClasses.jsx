import React, { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";

const MyClasses = () => {
  const { user, loading } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  

  useEffect(() => {
    if (user?.email) {
      const url = `https://the-music-studio-server.vercel.app/courses/instructor?email=${user?.email}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setMyCourses(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
    console.log(myCourses);
  }, [user]);

  if (loading) {
    return <progress className="progress w-56 bg-white"></progress>;
  }



  return (
    <div>
      <p>Total Classes:{myCourses.length}</p>
      <div className="grid grid-cols-4 gap-10 ml-10">
      {myCourses.map(myCourse => <div key={myCourse._id} className="card w-full bg-[#f2e5e6] text-black mx-auto shadow-xl">
        <div>
            <button className="absolute btn btn-secondary top-2 right-4 text-white bold">Enrolled: 0</button>
          <img className="h-[200px] w-full"
            src={myCourse.photo}
            alt=""
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{myCourse.className}</h2>
          <p>{myCourse.instructorEmail}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">{myCourse.status}</button>
          </div>
        </div>
      </div>)}
      </div>
      
    </div>
  );
};

export default MyClasses;
