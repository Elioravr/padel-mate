'use client';

import { SignUp } from '@clerk/nextjs';
import { getBaseURL } from '@utils/util';
import { usePathname } from 'next/navigation';

const SignInModal = () => {
  const path = usePathname();

  return (
    <div className='flex p-6 flex-col justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.7)]'>
      <h2 className='font-bold text-lg mb-3'>
        You must sign in to use PadelMate
      </h2>
      <SignUp
        routing='hash'
        forceRedirectUrl={`${getBaseURL()}${path.slice(1)}`}
      />
    </div>
  );
};

export default SignInModal;
