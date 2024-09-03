import Logo from '@components/Logo';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='navbar bg-base-100 fixed z-50'>
      <div className='flex-1'>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
    </div>
  );
}
