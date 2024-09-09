'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { getBaseURL } from '@utils/util';
import { usePathname } from 'next/navigation';

const PadelMateClerkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();
  const redirectAfterSignInURL = `${getBaseURL()}${path.slice(1)}`;
  return (
    <ClerkProvider
      signInForceRedirectUrl={redirectAfterSignInURL}
      signUpForceRedirectUrl={redirectAfterSignInURL}
    >
      {children}
    </ClerkProvider>
  );
};

export default PadelMateClerkProvider;
