import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex py-4 justify-between bg-zinc-700 text-white">
      <div className="logo">
        <span className="font-bold text-xl mx-8 cursor-pointer">iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-300">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all duration-300">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
