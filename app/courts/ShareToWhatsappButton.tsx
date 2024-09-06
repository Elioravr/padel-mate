import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ShareToWhatsappButton = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Set the current URL once the component is mounted
    setUrl(window.location.href);
  }, []); // The empty dependency array ensures this runs only once

  // Define the content you want to share
  const shareText = 'Join me in this Padel Court at PadelMate!';
  const shareUrl = url;
  // Create the WhatsApp share URL
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
    shareText
  )}%20${encodeURIComponent(shareUrl)}`;
  return (
    <Link href={whatsappUrl}>
      <Image
        src='/images/whatsapp-share-button-icon.svg'
        alt='share-to-whatsapp'
        width={100}
        height={30}
      />
    </Link>
  );
};

export default ShareToWhatsappButton;
