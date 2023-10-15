import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import PopularClassSection from "../PopularClassSection/PopularClassSection";
import { AuthContext } from "../../../providers/AuthProvider";
import Instructors from "../../Instructors/Instructors";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import FAQ from "../FAQ/FAQ";
import AvailableOn from "../AvailableOn/AvailableOn";
import Reviews from "../Reviews/Reviews";
import About from "./About/About";
import Contact from "./Contact";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Banner />
      <About />
      <PopularClassSection />
      <PopularInstructors />
      <Reviews />
      <FAQ />
      <Contact />
      <AvailableOn />
    </div>
  );
};

export default Home;
