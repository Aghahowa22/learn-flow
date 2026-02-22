import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpenText,  } from 'lucide-react'

const Footer = () => {
  return (
    <div className="bg-linear-to-r from-zinc-900 to-zinc-600 py-5 md:py-15">
      <div className="h-10vh md:flex justify-between px-5 lg:px-20 py-4 text-amber-50 gap-10">
        {/* logo heading */}
        <div>
          <div className="flex items-center ">
            <Link to="/" className="flex text-xl ">
              <BookOpenText className="h-8 w-10  text-amber-50 " />
              <div className="flex items-center">
                <span className="font-medium text-amber-50">Learn</span>
                <span className="text-amber-400 font-extrabold">Flow</span>
              </div>
            </Link>
          </div>
          <div>
            <p className="text-sm py-5 md:py-2">
              Top learning experience that create more talent around the world.
            </p>
          </div>
        </div>
        {/* links */}

        <div className="flex ">
          <div className="flex flex-col gap-2">
            <h3 className='font-bold text-amber-400'>Quick Links</h3>
            <Link className='text-sm' to="/about">About</Link>
            <Link className='text-sm' to="/">Courses</Link>
            <Link className='text-sm' to="/">Contact</Link>
            <Link className='text-sm' to="/">FAQs</Link>
          </div>

          <div className="flex flex-col gap-2 ml-10">
            <h3 className='font-bold text-amber-400'>Social</h3>
            <Link className='text-sm' to="/">Twitter</Link>
            <Link className='text-sm' to="/">Facebook</Link>
            <Link className='text-sm' to="/">Instagram</Link>
            <Link className='text-sm' to="/">LinkedIn</Link>
          </div>

          <div className="flex flex-col gap-2 ml-10">
            <h3 className='font-bold text-amber-400'>Legal</h3>
            <Link className='text-sm' to="/">Terms of Service</Link>
            <Link className='text-sm' to="/">Privacy Policy</Link>
            <Link className='text-sm' to="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="flex-row-reverse border-t  h-10vh md:flex justify-between px-5 lg:px-20 py-4 text-amber-50">
        <div>
          <p className="text-sm py-4 md:py-2 ">
            &copy; 2026 LearnFlow. by Aghahowa Edosa All rights reserved.
          </p>
        </div>
        {/* brands logo */}
        <div className="flex items-center gap-4">
          {/* twittwe */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter-icon lucide-twitter cursor-pointer"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          {/* facebook */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook-icon lucide-facebook cursor-pointer"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </div>
          {/* github */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github cursor-pointer"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </div>
          {/* linkdin */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin-icon lucide-linkedin cursor-pointer"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </div>
          {/* dribble */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-dribbble-icon lucide-dribbble cursor-pointer"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
              <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
              <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer