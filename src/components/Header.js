import React, { useState } from 'react';
import logo from '../images/logo.png'; // Update the path to your logo image

const Header = () => {
  const [isHoveringContact, setIsHoveringContact] = useState(false);

  return (
    <div className="bg-white text-black shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-20 w-25 mr-3" /> {/* Increased the size of the logo */}
        </div>
        <div className="flex space-x-4">
          <button
            className={`text-sm font-semibold px-3 py-2 rounded ${
              isHoveringContact ? 'bg-white text-black' : 'bg-[#496b22] text-white'
            }`}
          >
            Inventory Management
          </button>
          <button
            className="text-sm font-semibold text-black px-3 py-2 rounded hover:bg-[#496b22] hover:text-white"
            onMouseEnter={() => setIsHoveringContact(true)}
            onMouseLeave={() => setIsHoveringContact(false)}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
