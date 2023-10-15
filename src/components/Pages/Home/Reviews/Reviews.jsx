import React from "react";
import useAxiosSecure from "../../Dashboard/AllUsers/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Reviews = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: reviews = [] } = useQuery(["reviews"], async () => {
    const res = await axiosSecure.get("/reviews"); // Use the correct URL
    return res.data;
  });

  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div>
      <Heading heading="All Reviews" />
      <Slider {...settings} className=" md:px-40 lg:px-96 text-center font-bold mx-20">
        <div>
          <p className="font-bold">Name: {reviews[0]?.user_name}</p>
          <p><Rating className="mx-auto my-5" style={{ maxWidth: 180 }} value={reviews[0]?.rating} readOnly /></p>
          <p>Course Name: {reviews[0]?.course_name}</p>
          <p className="my-5">Review: {reviews[0]?.review_details}</p>
        </div>
        <div>
          <p className="font-bold">Name: {reviews[1]?.user_name}</p>
          <p><Rating className="mx-auto my-5" style={{ maxWidth: 180 }} value={reviews[1]?.rating} readOnly /></p>
          <p>Course Name: {reviews[1]?.course_name}</p>
          <p className="my-5">Review: {reviews[1]?.review_details}</p>
        </div>
        <div>
          <p className="font-bold">Name: {reviews[2]?.user_name}</p>
          <p><Rating className="mx-auto my-5" style={{ maxWidth: 180 }} value={reviews[2]?.rating} readOnly /></p>
          <p>Course Name: {reviews[2]?.course_name}</p>
          <p className="my-5">Review: {reviews[2]?.review_details}</p>
        </div>
        <div>
          <p className="font-bold">Name: {reviews[3]?.user_name}</p>
          <p><Rating className="mx-auto my-5" style={{ maxWidth: 180 }} value={reviews[3]?.rating} readOnly /></p>
          <p>Course Name: {reviews[3]?.course_name}</p>
          <p className="my-5">Review: {reviews[3]?.review_details}</p>
        </div>
        <div>
          <p className="font-bold">Name: {reviews[4]?.user_name}</p>
          <p><Rating className="mx-auto my-5" style={{ maxWidth: 180 }} value={reviews[4]?.rating} readOnly /></p>
          <p>Course Name: {reviews[4]?.course_name}</p>
          <p className="my-5">Review: {reviews[4]?.review_details}</p>
        </div>
      </Slider>
    </div>
  );
};

export default Reviews;
