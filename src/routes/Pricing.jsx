import React from 'react'
import { Link } from 'react-router-dom';
import { CircleCheckBig } from 'lucide-react';
import CodeImg2 from "../assets/codeImg2.jpg";
import CodeImgPrice from "../assets/codeImagePrice.jpg";
import Footer from '../component/Footer';

const Pricing = () => {
  return (
    <div className="">
      <div>
        <div className="w-full bg-linear-to-r from-zinc-900 to-zinc-600 ">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl text-center py-10 lg:text-4xl text-pretty text-amber-50 sm:text-4xl ">
              Simple pricing, for everyone.
            </h2>
            <p className="lg:py-5 text-amber-50 text-center">
              It doesn’t matter what size your business is, our software will
              work well for you.
            </p>
          </div>
          <div className="lg:flex justify-center md:grid  gap-10 py-10 text-amber-50">
            <div className="lg:max-w-87.5  px-5">
              <div className="flex items-center">
                <h2 className="py-2 text-6xl">9$</h2>
                <p className="text-center px-3">USD Per Month.</p>
              </div>
              <h4 className="text-2xl py-2">Beginner</h4>
              <p className="py-3">
                Ideal for individuals and freelancers just starting out.
              </p>
              <div className="">
                <Link
                  to="/signup"
                  className="w-full flex justify-center  border rounded-full p-2 hover:opacity-70 "
                >
                  Start your learning journey
                </Link>
              </div>

              <div className="grid gap-5 py-4">
                <div className="flex items-center space-x-2">
                  <CircleCheckBig />
                  <p>Access to all basic learning materials</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheckBig />
                  <p>track your learning progress</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheckBig />
                  <p>Track up to 15 learning activities per month</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheckBig />
                  <p>Access to all premium learning materials</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheckBig />
                  <p>Export your learning progress</p>
                </div>
              </div>
            </div>

            <div>
              <div className=" bg-amber-400 rounded-lg p-10 text-black">
                <div className="flex items-center">
                  <h2 className="py-2 text-6xl">15$</h2>
                  <p className="px-3">USD Per Month.</p>
                  <div className="bg-linear-to-r from-zinc-900 to-zinc-600  px-6 py-2 rounded-xl text-amber-50">
                    <p>Popular</p>
                  </div>
                </div>
                <h4 className="text-2xl py-2">Professional</h4>
                <p className="py-3">
                  Perfect for professionals and teams who want to take<br></br>{" "}
                  their learning to the next level.
                </p>
                <div className="">
                  <Link
                    to="/signup"
                    className="w-full flex justify-center  text-amber-50 rounded-full p-2 bg-black hover:opacity-80"
                  >
                    Start your learning journey
                  </Link>
                </div>

                <div className="grid gap-5 py-4 ">
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Access to all premium learning materials</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Customize your learning experience</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Track up to 50 learning activities per month</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Automated staff support</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Export up to 12 learning reports</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Bulk export learning materials and projects</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>payment in multiple currencies</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="px-5">
                <div className="flex items-center">
                  <h2 className="py-2 text-6xl">39$</h2>
                  <p className="px-3">USD Per Month.</p>
                </div>
                <h4 className="text-2xl py-2">Masters</h4>
                <p className="py-3">
                  Designed for businesses and organizations that require
                  <br></br> advanced features and support to manage their
                  learning<br></br> effectively.
                </p>
                <div>
                  <Link
                    to="/signup"
                    className="w-full flex justify-center border rounded-full p-2 hover:opacity-70 "
                  >
                    Start your learning journey
                  </Link>
                </div>

                <div className="grid gap-5 py-4">
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>
                      Unlimited access to all learning materials and courses
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Customize your learning experience</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Track up to 200 learning activities per month</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Automated staff support</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBig />
                    <p>Export unlimited learning reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mini sub hero */}
      <div>
        <div className="container mx-auto px-4 py-10">
          <div className="bg-amber-400 p-4 rounded-lg md:flex md:flex-row justify-items-center items-center gap-10">
            <img
              src={CodeImgPrice}
              alt="Dashboard Image"
              className="w-full rotate-10 max-w-100 object-cover rounded-lg mt-10 py-10"
            />

            <div>
              <h3 className="text-2xl md:text-3xl font-bold ">
                "If you think <span className="text-amber-50">education</span>{" "}
                is expensive, try estimating the cost of ignorance."
              </h3>
              <p className=" text-sm md:text-base py-2">
                Learn at your own pace and convenience with our flexible
                learning platform.
              </p>
              <Link
                to="/signup"
                className=" bg-linear-to-r from-zinc-900 to-zinc-600 text-white px-4 py-2 rounded-lg mt-4 inline-block hover:opacity-80"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Pricing