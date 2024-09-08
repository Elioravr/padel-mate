'use client';

import { SignIn } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const SignInModal = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div className='flex p-6 flex-col justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.7)]'>
      <h2 className='font-bold text-lg mb-3'>
        You must sign in to use PadelMate
      </h2>
      <SignIn routing='hash' forceRedirectUrl={url} />
    </div>
  );
};

export default SignInModal;
