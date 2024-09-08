'use client';

import JoinLeaveCourt from '@app/courts/JoinLeaveCourtButton';
import ShareToWhatsappButton from '@app/courts/ShareToWhatsappButton';
import { useAuth } from '@clerk/nextjs';
import { Court } from '@utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDate, formatHour } from '../utils/util';

function CourtItem({
  courtId,
  size = 'medium',
  onCourtUpdate,
}: {
  courtId: string;
  size?: 'small' | 'medium' | 'large';
  onCourtUpdate?: Function;
}) {
  const { userId } = useAuth();
  const [court, setCourt] = useState<Court | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let sizeClassName = 'w-96';
  if (size === 'medium') {
    sizeClassName = 'w-80';
  } else if (size === 'small') {
    sizeClassName = 'w-60';
  }

  // Handle refetching the court data after join/leave actions
  const refetchCourtData = async () => {
    try {
      const response = await fetch(`/api/courts/${courtId}`);
      if (response.ok) {
        const data = await response.json();
        setCourt(data);
      }
    } catch (err) {
      console.error('Error refetching court data:', err);
    }
  };

  // Fetch the court data when the component mounts
  useEffect(() => {
    const fetchCourtData = async () => {
      setLoading(true);
      setError(null);
      try {
        await refetchCourtData();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourtData();
  }, []);

  if (loading) {
    return size === 'large' ? (
      <div className='flex w-96 flex-col gap-4'>
        <div className='skeleton h-60 w-full'></div>
        <div className='skeleton h-4 w-28'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    ) : (
      <div className='skeleton h-72 w-80'></div>
    );
  }

  if (court == null) {
    return null;
  }

  return (
    <div
      className={`card bg-base-100 ${
        size === 'large' ? '' : 'image-full'
      } ${sizeClassName} shadow-xl`}
    >
      <figure>
        <Image
          src='/images/padel-court.jpg'
          width={300}
          height={300}
          style={{ width: '100%', height: 280 }}
          alt='padel-background'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{`${court.owner.firstName} ${court.owner.lastName}'s Court`}</h2>
        <div className='badge badge-info'>{court.location}</div>
        <div className='flex flex-wrap gap-1'>
          {court.players.map((player, index) => {
            return (
              <Link href={`/users/${player.id}`} key={index}>
                <div className='badge badge-neutral'>
                  {player.firstName} {player.lastName}
                </div>
              </Link>
            );
          })}
        </div>
        <p>
          {formatDate(court.date)} - {formatHour(court.date, court.duration)}
        </p>
        {size === 'large' && <ShareToWhatsappButton />}
        <div className='card-actions justify-end'>
          <JoinLeaveCourt
            courtId={courtId}
            isCourtFullyBooked={court.players.length === 4}
            refetchCourtData={async () => {
              await refetchCourtData();
              await onCourtUpdate?.();
            }}
            isCurrentUserInThisGroup={court.players.some(
              (player) => player.id === userId
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default CourtItem;
