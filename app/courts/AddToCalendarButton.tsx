'use client';

import { getBaseURL } from '@utils/util';
import Image from 'next/image';
import { useState } from 'react';

const AddToCalendarButton = ({
  courtId,
  text,
}: {
  courtId: string;
  text?: string;
}) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const addToCalendarClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsDownloading(true);

    // Construct the file URL
    const url = `${getBaseURL()}/api/courts/${courtId}/calendar-event`;

    // Create an invisible anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'court-event.ics');

    // Append to the DOM, trigger click, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate a delay to show loading spinner while the download initiates
    setTimeout(() => {
      setIsDownloading(false); // Stop the spinner after the click
    }, 1000); // Adjust delay as needed for better UX
  };

  return (
    <button
      className='btn btn-outline btn-primary'
      onClick={addToCalendarClick}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <span className='loading loading-spinner'></span>
      ) : (
        <Image
          src='/images/calendar.png'
          alt='share-to-whatsapp'
          width={26}
          height={26}
        />
      )}{' '}
      {text ?? 'Add to Calendar'}
    </button>
  );
};

export default AddToCalendarButton;
