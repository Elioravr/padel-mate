'use client';

import CourtItem from '@components/CourtItem';
import PlayersCarousel from '@components/PlayersCarousel';
import { Court } from '@utils/types';
import { getBaseURL } from '@utils/util';
import { useEffect, useState } from 'react';
import AddPlayerButton from '../AddPlayerButton';
const Page = ({ params: { courtId } }: { params: { courtId: string } }) => {
  const [court, setCourt] = useState<Court | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // This page is starting by loading

  const fetchCourt = async () => {
    setIsLoading(true);
    const response = await fetch(`${getBaseURL()}/api/courts/${courtId}`, {
      method: 'GET',
      cache: 'no-store', // Disable caching
    });
    setIsLoading(false);

    if (!response.ok) {
      setCourt(null);
      return;
    }

    const courtData: Court = await response.json();
    setCourt(courtData);
  };

  useEffect(() => {
    fetchCourt();
  }, []);

  const handleCourtChange = async () => {
    await fetchCourt();
  };

  if (isLoading) {
    return;
  }

  if (court == null) {
    return 'Court not found';
  }

  return (
    <div className='flex justify-center flex-col p-3'>
      <div className='flex justify-center'>
        <CourtItem
          courtId={court.id}
          size='large'
          onCourtUpdate={handleCourtChange}
        />
      </div>
      <AddPlayerButton
        courtId={court.id}
        playersToExclude={court.players}
        onCourtUpdate={handleCourtChange}
      />
      <PlayersCarousel
        title='Players in this court'
        players={court.players}
        noPlayersPlaceholder={
          <div className='text-base flex items-center flex-col'>
            <div>No players have joined this court yet.</div>
            <div>Be the first to join! 😎</div>
          </div>
        }
        enableRemovePlayerButton
      />
    </div>
  );
};

export default Page;
