import Link from 'next/link';
import React from 'react';
import './globals.css';


function Nav() {
    return (
        <div class= "nav-bar-text"> 
        <div class="header"> 
          <div className='logo'>
            <h2>Lucy Moore</h2>
          </div>
          <div className='menu'></div>
          <nav>                    
            <ul className='flex gap-[20px]'>
              <li> <Link href="/">Home</Link> </li>                    
              <li> <Link href="/projects">Projects</Link> </li>
              <li> <Link href="/contact">Contact</Link> </li>
            </ul>
          </nav>
        </div>
      </div>
    )
}

export default Nav