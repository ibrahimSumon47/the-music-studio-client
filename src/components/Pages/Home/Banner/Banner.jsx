import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import bannerVideo from "../../../../assets/mixkit-hands-of-a-skillful-musician-playing-a-wooden-piano-50330.mp4"

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="hero min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source
          src={bannerVideo}
          type="video/mp4"
        />
        {/* You can add additional source elements for other video formats */}
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome To <span>The Music Studio</span>
          </h1>
          <p className="mb-5">
          Grow your skills with The Music Studio
          </p>
          {user ? (
            <></>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
