import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-solid border-0 border-t border-gray-300 text-xs">
      <div className="max-w-screen-xl mx-auto p-6 sm:py-6">
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-between sm:gap-0 sm:text-start">
          <div className="flex flex-row gap-1">
            <div>&copy; 2024 Hack4Impact Cornell </div>{" "}
            &#x2022;{" "}
            <div>All Rights Reserved</div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="text-black">
              Terms of Service
            </div>{" "}
            &#x2022;{" "}
            <div className="text-black">
              Privacy Policy
            </div>{" "}
            &#x2022;{" "}
            <Link className="text-black no-underline hover:underline" href="https://www.okbfoundation.org/">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;