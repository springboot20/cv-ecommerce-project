import { Link } from 'react-router-dom'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { TwitterIcon, Linkedin, Instagram, FaceBookIcon } from './Icons' // Assuming Icons are correctly imported

export const Footer = () => {
  const footerLinks = [
    {
      title: 'About',
      url: '#',
    },
    {
      title: 'Contact',
      url: '#',
    },
    {
      title: 'FAQ',
      url: '#',
    },
  ]

  const footerRoutes = [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Collection',
      to: '/collections',
    },
    {
      title: 'Orders',
      to: '/orders',
    },
  ]

  return (
    <footer className="bg-white inset-x-0 p-10 w-full relative">
      <div className="max-w-8xl mx-auto flex flex-col space-y-10">
        {/* Top section with logo, navigation links, and email subscription */}
        <div className="flex items-start justify-between space-x-8">
          {/* Logo and site name */}
          <div className="flex-shrink-0">
            <span className="logo-name text-gray-800 text-3xl font-semibold">
              <span className="text-[#e2342d]">Cart</span>
              <span className="text-[#3a408c]">Shop</span>
            </span>
          </div>

          {/* Navigation links */}
          <div className="flex space-x-20">
            {/* Footer routes */}
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-[#4a4b4d] mb-2">
                Explore
              </h4>
              {footerRoutes.map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="text-base text-[#4a4b4d] hover:text-gray-800"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Footer links */}
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-[#4a4b4d] mb-2">
                Learn More
              </h4>
              {footerLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className="text-base text-[#4a4b4d] hover:text-gray-800"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Email subscription */}
          <div className="flex flex-col items-start space-y-6 w-[20rem] bottom-0">
            <p className="text-base text-[#4a4b4d] leading-7 font-medium">
              Be the first to know about our biggest and best sales. We'll never
              send more than one email a month.
            </p>

            <div className="flex items-center w-full relative">
              <input
                type="email"
                className="border-b border-[#4a4b4d] outline-none focus:outline-none focus:border-[#4a4b4d] w-full text-base placeholder-[#4a4b4d] py-2"
                placeholder="Enter your email"
              />
              <EnvelopeIcon className="h-7 w-7 text-[#4a4b4d] absolute top-[50%] right-2 -translate-y-1/2" />
            </div>

            {/* Social media icons */}
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#004197] cursor-pointer">
                <TwitterIcon className="h-6 text-white" />
              </span>
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#004197] cursor-pointer">
                <Linkedin className="h-6 text-white" />
              </span>
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#004197] cursor-pointer">
                <FaceBookIcon className="h-6 text-white" />
              </span>
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#004197] cursor-pointer">
                <Instagram className="h-6 text-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="text-center">
          <h3 className="text-lg text-[#4a4b4d] font-medium capitalize">
            All rights are reserved
          </h3>
        </div>
      </div>
    </footer>
  )
}
