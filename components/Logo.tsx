import { Pacifico } from 'next/font/google';
import Image from 'next/image';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export type LogoSize = 'small' | 'medium' | 'large';

const Logo = ({
  includeLogo = true,
  includeText = true,
  size = 'small',
  animated = false,
}: {
  includeLogo?: boolean;
  includeText?: boolean;
  size?: LogoSize;
  animated?: boolean;
}) => {
  let logoSize = 35;

  if (size === 'medium') {
    logoSize = 45;
  } else if (size === 'large') {
    logoSize = 85;
  }

  return (
    <div className='flex'>
      {includeLogo && (
        <Image
          src='/images/logo.png'
          alt='padelmate-logo'
          width={logoSize}
          height={logoSize}
          className={`${includeText ? 'mr-2' : ''} ${
            animated ? 'animate-bounce' : ''
          }`}
        />
      )}
      {includeText && (
        <div className={`text-2xl ${pacifico.className}`}>PadelMate</div>
      )}
    </div>
  );
};

export default Logo;
