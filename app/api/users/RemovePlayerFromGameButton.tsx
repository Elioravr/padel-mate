'use client';

import { useState } from 'react';

const RemovePlayerFromGameButton = ({
  playerId,
  courtId,
  onCourtUpdate,
}: {
  playerId: string;
  courtId: string;
  onCourtUpdate?: Function;
}) => {
  const [isRemovingPlayer, setIsRemovingPlayer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const leaveCourt = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsRemovingPlayer(true);
    setError(null);
    try {
      const response = await fetch('/api/courts/leave-court', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courtId, userId: playerId }), // Replace with actual user ID
      });
      if (!response.ok) throw new Error('Failed to join court');
      await onCourtUpdate?.(); // Refetch the court data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsRemovingPlayer(false);
    }
  };

  return (
    <>
      {error && <div className='text-red-500'>{error}</div>}
      <button className='btn btn-error' onClick={leaveCourt}>
        {isRemovingPlayer && <span className='loading loading-spinner'></span>}
        {isRemovingPlayer ? 'Removing...' : 'Remove from court'}
      </button>
    </>
  );
};

export default RemovePlayerFromGameButton;
