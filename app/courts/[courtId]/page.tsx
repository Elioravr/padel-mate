'use client';

import AddPlayerButton from '@app/courts/AddPlayerButton';
import DeleteCourtButton from '@app/courts/DeleteCourtButton';
import JoinLeaveCourt from '@app/courts/JoinLeaveCourtButton';
import ShareToWhatsappButton from '@app/courts/ShareToWhatsappButton';
import { useAuth } from '@clerk/nextjs';
import CourtItem from '@components/CourtItem';
import PlayersCarousel from '@components/PlayersCarousel';
import { Court } from '@utils/types';
import { getBaseURL } from '@utils/util';
import { useEffect, useState } from 'react';
import AddToCalendarButton from '../AddToCalendarButton';

const Page = ({ params: { courtId } }: { params: { courtId: string } }) => {
  const { userId } = useAuth();
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

      <div className='flex flex-col px-2 gap-4'>
        <JoinLeaveCourt
          courtId={courtId}
          isCourtFullyBooked={court.players.length === 4}
          refetchCourtData={async () => {
            await handleCourtChange();
          }}
          isCurrentUserInThisGroup={court.players.some(
            (player) => player.id === userId
          )}
        />
        <AddToCalendarButton courtId={courtId} />
        <ShareToWhatsappButton />
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
        courtId={courtId}
        onCourtUpdate={handleCourtChange}
      />

      <DeleteCourtButton courtId={court.id} />
    </div>
  );
};

export default Page;
