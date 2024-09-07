'use client';

import { SignIn } from '@clerk/nextjs';

const SignInModal = () => {
  return (
    <div className='flex p-6 flex-col justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.7)]'>
      <h2 className='font-bold text-lg mb-3'>
        You must sign in to use PadelMate
      </h2>
      <SignIn routing='hash' forceRedirectUrl={window.location.href} />
    </div>
  );
};

export default SignInModal;
