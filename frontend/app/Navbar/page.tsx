"use client";
import React from 'react';
import Link from 'next/link';
import { NavbarProps } from '../types/page';

const Navbar: React.FC<NavbarProps> = ({ hasToken, onLogout }) => {
  return (
    <nav>
      <ul>
        {hasToken ? (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
