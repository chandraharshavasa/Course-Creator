import React from 'react';
import { FaArrowLeft, FaChevronDown, FaEllipsisH, FaChevronRight } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-button back-button">
          <FaArrowLeft />
          <span className="button-text">Back</span>
        </button>
        <div className="nav-dropdown">
          <span className="dropdown-text">English (Original)</span>
          <FaChevronDown />
        </div>
      </div>
      <div className="nav-center">
        <button className="nav-button active">Edit</button>
        <button className="nav-button">Set up</button>
        <button className="nav-button">Publish</button>
      </div>
      <div className="nav-right">
        <span className="nav-status">
          <span className="status-dot"></span>
          Saved
        </span>
        <button className="nav-button options-button">
          <FaEllipsisH />
        </button>
        <button className="nav-button share-button">Share</button>
        <button className="nav-button next-button">
          <span className="button-text">Next: Set up</span>
          <FaChevronRight />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

