import AddCourtButton from '@app/courts/AddCourtButton';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Logo from '@components/Logo';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='navbar bg-base-100 fixed z-50 px-4'>
      <div className='flex-1 justify-between'>
        <Link href='/'>
          <Logo animated={true} />
        </Link>
        <SignedIn>
          <div className='flex items-center'>
            <UserButton />
            <AddCourtButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
