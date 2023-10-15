import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heading from "../../../Heading/Heading";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service",
        "template",
        form.current,
        "PUBLIC"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message send successfully");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send message");
        }
      );
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Heading className="mb-5" heading="Contact US"></Heading>
      {/* <h3 className="font-bold text-3xl pl-5 text-center my-10 text-cyan-500">
        Connect with me
      </h3> */}
      <p className="text-2xl pl-5 md:mx-28 lg:mx-96 my-10">
        If you want to know more about us or how we work, or if you would just
        like to say hello, send me a message. We love to hear from you.
      </p>
      <div className="lg:flex lg:max-w-6xl md:gap-10 p-5 md:px-52 lg:p-5 mx-auto">
        <form
          className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 p-5 mb-10 "
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered border-4"
              type="text"
              name="user_name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered border-4"
              type="email"
              name="user_email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered border-4 py-10"
              type="text"
              name="message"
            />
            <input
              className="btn btn-primary border-4 mt-5"
              type="submit"
              value="Send"
            />
          </div>
        </form>
        <div className="divider lg:divider-horizontal md:mx-36">OR</div>
        <div>
          <h1 className="text-3xl font-bold">Email</h1>
          <a
            href="Email"
            className="mb-12 mt-4 font-semibold text-blue-700 block uppercase"
          >
            ibrahimsumon005@gmail.com
          </a>
          <h1 className="text-3xl font-bold">Contact Number</h1>
          <a
            href="Email"
            className="mb-12 mt-4 font-semibold text-blue-700 block uppercase"
          >
            (+880) 1710-642862
          </a>
          {/* <h1 className="text-3xl font-bold">Social Networks</h1> */}
          {/* <div className="mb-12 mt-4"><SocialLinks/></div> */}
          <h1 className="text-3xl font-bold">Address</h1>
          <p>
            Board Bazar, Gazipur- 1704, <br /> Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
