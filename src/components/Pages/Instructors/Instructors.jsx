import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Instructors = () => {
  const { user, loading } = useAuth();
  const [instructors, setInstructor] = useState([]);

  useEffect(() => {
    const url = `https://the-music-studio-server.vercel.app/users/instructor`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setInstructor(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    console.log(instructors);
  }, [user]);

//   if (loading) {
//     return <progress className="progress w-56 bg-white"></progress>;
//   }
  return (
    <div>
      <div className="grid grid-cols-1 mx-8 gap-y-10 my-10 md:grid-cols-2 md:gap-x-40 md:px-10 md:mx-0 lg:grid-cols-3 lg:gap-x-48 lg:px-0">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="card w-96 text-black bg-white shadow-xl">
            <figure>
              <img className="h-52 w-full"
                src={instructor.photo || "https://img.freepik.com/free-photo/user-profile-front-side-with-white-background_187299-40009.jpg?w=740&t=st=1691487395~exp=1691487995~hmac=c71d01451a179d59d0f93e1c4ca800dd4e666a12d01c5407e16695b2fc0f8946"}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{instructor.name}</h2>
              <p>Email: {instructor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
