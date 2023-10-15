import React from "react";
import Heading from "../../../../Heading/Heading";

const About = () => {
  return (
    <div>
        <Heading  heading="About Us"/>
      <div className="lg:flex justify-center items-center">
        <img className="lg:w-2/4 lg:rounded-r-full" src="https://i.ibb.co/LN4CfbP/image-2023-08-15-193547823-cleanup.png" alt="" />
      <p className="px-5 md:mt-5 text-2xl lg:text-4xl">Welcome to The Music Studio! We are your premier destination for
      comprehensive and inspiring music installation training courses. With a
      passion for music that resonates in every chord, we're here to nurture
      your musical journey like never before. Our experienced instructors are
      dedicated to helping you master the art of music installations, whether
      you're a beginner or an experienced enthusiast. Join us at The Music
      Studio and let's create harmonious installations together!</p>
      </div>
    </div>
  );
};

export default About;
