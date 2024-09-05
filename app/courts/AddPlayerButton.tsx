'use client';

import { Player } from '@prisma/client';
import { getBaseURL } from '@utils/util';
import { useEffect, useMemo, useState } from 'react';

const AddPlayerButton = ({
  courtId,
  playersToExclude,
  onCourtUpdate,
}: {
  courtId: string;
  playersToExclude: Player[];
  onCourtUpdate: Function;
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start by fetching the players list
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayerIdToAdd, setSelectedPlayerIdToAdd] =
    useState<string>('');

  const fetchAllPlayers = async () => {
    const response = await fetch(`${getBaseURL()}/api/users`, {
      method: 'GET',
      cache: 'no-store', // Disable caching
    });

    const allPlayers = await response.json();
    setPlayers(allPlayers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const joinCourt = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsAddingPlayer(true);
    setError(null);
    try {
      const response = await fetch('/api/courts/join-court', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courtId, userId: selectedPlayerIdToAdd }), // Replace with actual user ID
      });
      if (!response.ok) throw new Error('Failed to join court');
      await onCourtUpdate?.(); // Refetch the court data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsAddingPlayer(false);
    }
  };

  const sortedAndFilteredPlayers = useMemo(() => {
    return players
      .filter(
        (player) =>
          !playersToExclude.some((currPlayer) => currPlayer.id === player.id)
      )
      .sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      });
  }, [players, playersToExclude]);

  const handleSelectedUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPlayerIdToAdd(event.target.value);
  };

  return (
    <div className='mb-3'>
      {error && <div className='text-red-500'>{error}</div>}
      <h1 className='text-2xl font-bold my-4 px-2'>Add Players to the court</h1>
      {playersToExclude.length === 4 && (
        <div className='badge badge-accent m-3'>Court is fully booked</div>
      )}
      {isLoading ? (
        <div className='flex mb-3'>
          <div className='skeleton w-full h-14 me-2'></div>
          <div className='skeleton w-24 h-14'></div>
        </div>
      ) : (
        <div className='flex px-2'>
          <select
            className='select select-info w-full me-2'
            disabled={playersToExclude.length === 4}
            onChange={handleSelectedUserChange}
            value={selectedPlayerIdToAdd}
          >
            <option>Select Player</option>

            {sortedAndFilteredPlayers.sort().map((player) => {
              return (
                <option key={player.id} value={player.id}>
                  {player.firstName} {player.lastName}
                </option>
              );
            })}
          </select>

          <button
            className='btn btn-primary'
            disabled={isAddingPlayer || selectedPlayerIdToAdd === ''}
            onClick={joinCourt}
          >
            {isAddingPlayer && (
              <span className='loading loading-spinner'></span>
            )}
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPlayerButton;
