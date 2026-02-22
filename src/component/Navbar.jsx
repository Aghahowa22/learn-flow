import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpenText , Menu, X, User, LogOut} from 'lucide-react'

const Navbar = () => {

  const [click, setCLick] = useState(false);

  const handleClick = () => {
    setCLick(!click)
  }
  const handleLogo = () => {
    setCLick(false)
  }
  const content = (
    <>
      <div onClick={handleClick} className="z-50 md:hidden block absolute top-16 w-full h-screen right-0 left-0 bg-zinc-900 transition ">
        <ul className="text-center text-xl p-20 ">
          <Link to="/about">
            
            <li className="my-0 py-4 text-amber-50 border-b border-amber-400 ">
              About
            </li>
          </Link>
          <Link to="/features">
            <li className="my-0 py-4 text-amber-50 border-b border-amber-400 ">
              Features
            </li>
          </Link>
          <Link to="/pricing">
            <li className="my-0 py-4  text-amber-50 border-b border-amber-400 ">
              Pricing
            </li>
          </Link>

          <Link to="/login">
            <li className="my-0 py-4  text-amber-50 border-b border-amber-400 ">
              Sign in
            </li>
          </Link>
          <Link to="/signup">
            <li className="my-4 py-4 text-sm bg-amber-400  rounded-full hover:opacity-85">
              Start your learning journey
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div>
        <div className="h-10vh flex justify-between px-5 lg:px-20 py-4 bg-zinc-900">
          <div onClick={handleLogo}  className="flex items-center ">
            <Link to="/" className="flex text-2xl ">
              <BookOpenText className="h-8 w-10  text-amber-50 " />
              <div className="flex items-center">
                <span className="font-medium text-amber-50">Learn</span>
                <span className="text-amber-400 font-extrabold">Flow</span>
              </div>
            </Link>
          </div>

          <div className="lg:flex  md:flex  items-center  font-normal hidden">
            <div className="">
              <ul className="flex items-center text-amber-50 gap-8 lg:mr-10 md:mr-10 mr-16 ">
                <Link to="/about">
                  <li>About</li>
                </Link>
                <Link to="/features">
                  <li>Features</li>
                </Link>
                <Link to="/pricing">
                  <li>Pricing</li>
                </Link>

                {/* <Link to="/login">
                  <li>Sign in</li>
                </Link> */}
              </ul>
            </div>
          </div>
          <div className="lg:flex  md:flex  items-center  font-normal hidden">
            <ul>
              <Link to="/signup">
                <li className="border border-amber-400 p-2  text-amber-400 rounded-full hover:opacity-85">
                  Start your learning journey
                </li>
              </Link>
            </ul>
          </div>

          <div className="md:hidden">{click && content}</div>

          <button onClick={handleClick} className="block cursor-pointer md:hidden  transition">
            {click ? <X className='text-amber-50'/> : <Menu className='text-amber-50'/>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
