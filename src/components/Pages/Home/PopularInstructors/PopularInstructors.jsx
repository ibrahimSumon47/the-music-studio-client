import React from "react";
import useAxiosSecure from "../../Dashboard/AllUsers/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../Heading/Heading";

const PopularInstructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortedInstructors = courses.sort(
    (a, b) => b.enrollmentCount - a.enrollmentCount
  );

  const popularInstructors = sortedInstructors.slice(0, 6);

  return (
    <div>
      <Heading heading="Popular Instructors"></Heading>
      <div className="mb-10 grid grid-cols-1 mx-7 md:mx-8 lg:mx-0 gap-y-20 md:grid-cols-2 md:gap-x-36 lg:grid-cols-3 lg:gap-x-48">
        {popularInstructors.map((instructor) => (
          <div className="grid grid-cols-2">
            <div
              key={instructor._id}
              className="rounded-t-full w-96  bg-white text-black shadow-xl "
            >
              <figure>
                <img className="h-[300px] w-full rounded-t-full" src={instructor.photo || "https://img.freepik.com/free-photo/user-profile-front-side-with-white-background_187299-40009.jpg?w=740&t=st=1691487395~exp=1691487995~hmac=c71d01451a179d59d0f93e1c4ca800dd4e666a12d01c5407e16695b2fc0f8946"} alt="" />
              </figure>
              <div className=" text-center">
                <h2 className="text-2xl font-bold">{instructor.name}</h2>
                <p>Instructor Email: {instructor.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
