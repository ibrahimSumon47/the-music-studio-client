import React from "react";
import Heading from "../../../Heading/Heading";
import Lottie from "lottie-react";
import faq from "../../../../assets/faq.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const FAQ = () => {
  const [isChecked, setIsChecked] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="">
      <Heading className="mb-5" heading="FAQ"></Heading>
      <div className="flex flex-col lg:flex-row justify-around items-center">
        <div className="mb-5 w-full lg:w-[1000px]">
          <Lottie animationData={faq}></Lottie>
        </div>
        <div className="lg:w-1/2 my-5 md:mt-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
          >
            <div className="collapse collapse-arrow bg-base-200 my-10">
              <input
                type="radio"
                className="cursor-pointer"
                name="my-accordion-2"
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked ? "checked" : ""}
              />
              <div className="collapse-title text-xl font-medium">
                Q1: What is The Music Studio??
              </div>
              <div className="collapse-content">
                <p>
                  A1: The Music Stdio is an online platform dedicated to learning
                  music instruments. It offers a wide range of resources, including
                  instructional videos, tutorials, articles, and training plans
                  to help users develop their music instruments skills.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-10">
              <input
                type="radio"
                className="cursor-pointer"
                name="my-accordion-2"
              />
              <div className="collapse-title text-xl font-medium">
                Q2: What types of music instruments can I learn on The Music Studio?
              </div>
              <div className="collapse-content">
                <p>
                  A2: The Music Studio covers a variety of  disciplines,
                  such as Playing Guitar, Piano Playing, Drumming, Accordion, Flute, String instruments, and more. You can choose to learn a specific music instruments
                  or explore multiple styles based on your interests.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-10">
              <input
                type="radio"
                className="cursor-pointer"
                name="my-accordion-2"
              />
              <div className="collapse-title text-xl font-medium">
                Q3: Is The Music Studio suitable for beginners?
              </div>
              <div className="collapse-content">
                <p>
                  A3: Absolutely! The Music Studio caters to all skill levels,
                  including beginners. The platform provides comprehensive
                  beginner-friendly content, step-by-step guides, and
                  foundational techniques to help newcomers get started on their
                  music instruments journey.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-10">
              <input
                type="radio"
                className="cursor-pointer"
                name="my-accordion-2"
              />
              <div className="collapse-title text-xl font-medium">
                Q4: How can I access the content on The Music Studio?
              </div>
              <div className="collapse-content">
                <p>
                  A4: To access the content on The Music Studio, simply visit the
                  website at https://marvelous-wisp-a706f4.netlify.app. Once there, you can
                  browse through the various sections, select your desired
                  music instruments, and explore the available resources, such as
                  videos, articles, and training materials.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
              <input
                type="radio"
                className="cursor-pointer"
                name="my-accordion-2"
              />
              <div className="collapse-title text-xl font-medium">
                Q5: Are there any interactive features on The Music Studio?
              </div>
              <div className="collapse-content">
                <p>
                  A5: Yes, The Music Studio offers interactive features to enhance
                  your learning experience. You can participate in forums or
                  discussion boards to connect with fellow music instruments
                  enthusiasts, ask questions, share experiences, and seek
                  guidance. Additionally, there may be live webinars or virtual
                  classes conducted periodically for members.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
