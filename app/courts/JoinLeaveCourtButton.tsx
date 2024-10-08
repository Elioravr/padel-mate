'use client'; // Client component

import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

export default function JoinLeaveCourt({
  courtId,
  isCourtFullyBooked,
  isCurrentUserInThisGroup,
  refetchCourtData,
}: {
  courtId: string;
  isCourtFullyBooked: boolean;
  isCurrentUserInThisGroup: boolean;
  refetchCourtData: () => Promise<void>;
}) {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to join the court
  const joinCourt = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/courts/join-court', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courtId, userId }), // Replace with actual user ID
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join court');
      }
      await refetchCourtData(); // Refetch the court data
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to leave the court
  const leaveCourt = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/courts/leave-court', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courtId, userId }), // Replace with actual user ID
      });
      if (!response.ok) throw new Error('Failed to leave court');
      await refetchCourtData(); // Refetch the court data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-end'>
      {error && <div className='text-red-500'>{error}</div>}
      {isCurrentUserInThisGroup ? (
        <button
          className='btn btn-outline btn-error'
          onClick={leaveCourt}
          disabled={isLoading}
        >
          {isLoading && <span className='loading loading-spinner'></span>}
          {isLoading ? 'Leaving...' : 'Leave Court'}
        </button>
      ) : !isCourtFullyBooked ? (
        <button
          className='btn btn-primary'
          onClick={joinCourt}
          disabled={isLoading}
        >
          {isLoading && <span className='loading loading-spinner'></span>}
          {isLoading ? 'Joining...' : 'Join Court'}
        </button>
      ) : (
        <button className='btn btn-primary mt-3' disabled>
          Court is Fully Booked
        </button>
      )}
    </div>
  );
}
