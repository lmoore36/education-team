import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="logo">
        <Link href="/">
          Joe's Portfolio
        </Link>
      </div>
      <a href="" className="cta-btn">Resume</a>
    </div>
  )
}

export default Nav