import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@components/Logo';

const Navbar = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={`sm:flex hidden bg-green-500 p-4 h-14 justify-between items-center text-white`}
      >
        <Logo />
        <Link href='/signup'>Sign Up</Link>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex bg-green-500 p-2 height h-14 justify-start items-center text-white text-2xl'>
        <Logo />
      </div>
    </>
  );
};

export default Navbar;
