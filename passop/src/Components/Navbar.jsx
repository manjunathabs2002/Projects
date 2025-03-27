import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar bg-purple-200 flex justify-between items-center p-3">
      <div className="logo font-bold text-3xl">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP&gt;</span>
      </div>

      <ul>
        <li className="flex gap-4">
          <a className="hover:font-bold cursor-pointer" href="/">
            Home
          </a>
          <a className="hover:font-bold cursor-pointer" href="#">
            About
          </a>
          <a className="hover:font-bold cursor-pointer" href="#">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
