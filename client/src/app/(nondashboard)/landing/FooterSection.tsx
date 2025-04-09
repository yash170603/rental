import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-20 dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <Link href="/" className="text-black text-xl font-bold dark:text-white" scroll={false}>
              RENTIFUL
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6 text-black">
              <li>
                <Link href="/about" className="text-black dark:text-white ">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-black dark:text-white">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-black dark:text-white">FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="text-black dark:text-white">Terms</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-black dark:text-white">Privacy</Link>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4 mb-4 text-black dark:text-white">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-primary-600 text-black"
            >
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 dark:bg-white" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary-600">
              <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Linkedin"
              className="hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-primary-600">
              <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
          <span>© RENTiful. All rights reserved.</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;