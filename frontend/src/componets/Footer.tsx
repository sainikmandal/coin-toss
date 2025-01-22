import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Sainik. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
