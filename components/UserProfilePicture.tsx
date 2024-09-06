'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const ProfilePicture = () => {
  const { user } = useUser();

  if (!user) return null; // Or a loading state

  return (
    <Image
      src={user.imageUrl}
      alt='Profile'
      className='rounded-full'
      width={30}
      height={30}
    />
  );
};

export default ProfilePicture;
