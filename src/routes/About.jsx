import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import data from "../component/About";
import AboutImg from "../assets/aboutImg1.webp";
import AboutImg2 from "../assets/aboutImg2.webp";
import AboutImg3 from "../assets/aboutImg3.webp";
import Footer from "../component/Footer";


const About = () => {
  const [selected, setSelected] = useState(null);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex justify-items-center items-center gap-10">
          {/* accordian */}
          <div className="w-full py-10">
            {data && data.length > 0 ? (
              data.map((dataItem) => (
                <div key={dataItem.id} className="">
                  <div
                    onClick={() => handleSingleSelection(dataItem.id)}
                    className="flex justify-between items-center cursor-pointer bg-gray-200 p-4 mb-2"
                  >
                    <h1 className="text-xl font-bold">{dataItem.question}</h1>
                    <span className="text-2xl">+</span>
                  </div>
                  {selected === dataItem.id ? (
                    <div className="">{dataItem.answer}</div>
                  ) : null}
                </div>
              ))
            ) : (
              <div>No Data Found</div>
            )}
          </div>
          {/* about learnflow */}
          <div>
            <div className="border-2 max-w-50 text-amber-400 my-4"></div>
            <h1 className="text-3xl font-bold">About LearnFlow</h1>
            <p className="text-l py-4">
              LearnFlow is a platform designed to help students learn
              programming concepts through interactive exercises and real-world
              projects.Our mission is to make learning programming accessible
              and engaging for everyone, regardless of their background or
              experience level.
            </p>
            <Link
              className="bg-amber-400 p-2 rounded-md hover:opacity-80"
              to="/signup"
            >
              Learn More
            </Link>
          </div>
          {/* real world exprience */}
          <div className="py-5">
            <div className="border-2 max-w-50 text-amber-400 my-4"></div>
            <h1 className="text-3xl font-bold ">Real-World Experience</h1>
            <p className="text-l py-6">
              At LearnFlow, we believe that the best way to learn programming is
              through hands-on experience. That's why we offer a variety of
              projects and exercises that allow students to apply their
              knowledge in real-world scenarios.Our platform provides a
              supportive community where students can collaborate, share their
              work, and receive feedback from peers and mentors.
            </p>
            <Link
              className="bg-amber-400 p-2 rounded-md hover:opacity-80"
              to="/signup"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* explore what learn flow can offer */}
        <div>
          <h1 className="text-4xl font-bold py-4">
            Explore What LearnFlow Can Offer
          </h1>
          <Link
            className="text-amber-600 p-2 text-xl rounded-md hover:opacity-80 "
            to="/signup"
          >
            View all programs
            <ChevronRight className="inline-block ml-2" />
          </Link>
        </div>
        {/* about face card */}
        <div className="lg:flex justify-items-center items-center gap-10 py-10">
          {/* face card 1 */}
          <div>
            <div>
              <img
                src={AboutImg}
                alt="About Image1"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold">Beninners Program</h2>
              <p className="py-4">
                Learn the fundamentals of programming with our beginner-friendly
                curriculum and interactive exercises to build a strong foundation in coding and problem-solving skills for aspiring programmers of all ages and backgrounds.
              </p>
              <Link
                className="bg-amber-400 p-2 rounded-md hover:opacity-80"
                to="/signup"
              >
                Learn More
              </Link>
            </div>
          </div>
          {/* face card 2 */}
          <div>
            <div>
              <img
                src={AboutImg2}
                alt="About Image1"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold">Professional Program</h2>
              <p className="py-4">
                Learn advanced programming concepts and techniques with our
                professional-level curriculum and real-world projects to enhance your coding skills and prepare for a career in software development and beyond.
              </p>
              <Link
                className="bg-amber-400 p-2 rounded-md hover:opacity-80"
                to="/signup"
              >
                Learn More
              </Link>
            </div>
          </div>
          {/* face card 3 */}
          <div>
            <div>
              <img
                src={AboutImg3}
                alt="About Image1"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold">Masters Program</h2>
              <p className="py-4">
                teams and companies can learn how to use LearnFlow to upskill their employees and improve their coding skills through our comprehensive masters program, which offers advanced training and resources for organizations looking to enhance their team's programming capabilities.
              </p>
              <Link
                className="bg-amber-400 p-2 rounded-md hover:opacity-80"
                to="/signup"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
