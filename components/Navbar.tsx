import AddCourtButton from '@app/courts/AddCourtButton';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Logo from '@components/Logo';
import ProfilePicture from '@components/UserProfilePicture';
import Link from 'next/link';

export default function Navbar() {
  const { userId } = auth();

  return (
    <div className='navbar bg-base-100 fixed z-50 px-4'>
      <div className='flex-1 justify-between'>
        <Link href='/'>
          <Logo animated={true} />
        </Link>
        <SignedIn>
          <div className='flex items-center'>
            <details className='dropdown flex items-center'>
              <summary className='btn btn-ghost'>
                <ProfilePicture />
              </summary>
              <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
                <li>
                  <Link href={`/users/${userId}`}>My Profile</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
            </details>

            <AddCourtButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
