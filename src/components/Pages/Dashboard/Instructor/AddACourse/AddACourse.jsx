import React from "react";
import useAuth from "../../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddACourse = () => {
  const { user } = useAuth();

  const handleAddACourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.photo.value;
    const className = form.className.value;
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const seats = form.seats.value;
    const price = form.price.value;
    // const details = form.details.value;

    const courseAdd = {
      photo,
      className,
      instructorName,
      instructorEmail,
      seats:parseInt(seats),
      price:parseInt(price),
      // details,
      status: "pending",
      feedback: "",
      enrolled: 0,
    };

    fetch("https://the-music-studio-server.vercel.app/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(courseAdd),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your class is waiting for admin approval",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto my-auto">
      <h2 className="text-center text-3xl font-bold">Add A Course</h2>
      <div>
        <form onSubmit={handleAddACourse}>
          <div className="flex gap-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class Name</span>
              </label>
              <input
                type="text"
                name="className"
                placeholder="Class Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                type="text"
                name="instructorName"
                defaultValue={user?.displayName}
                placeholder="Instructor Name"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class Photo</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Class Photo URL"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Instructor Email</span>
              </label>
              <input
                type="email"
                name="instructorEmail"
                defaultValue={user?.email}
                placeholder="Instructor Email"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available seats</span>
              </label>
              <input
                type="number"
                name="seats"
                placeholder="Available seats"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Price of the Class"
                className="input input-bordered"
              />
            </div>
          </div>
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Details of the Class</span>
            </label>
            <input
              type="text"
              name="details"
              placeholder="Details of the Class"
              className="input input-bordered"
            />
          </div> */}

          <div className="form-control my-6">
            <input
              className="btn btn-primary"
              type="submit"
              value="Add A Class"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddACourse;
