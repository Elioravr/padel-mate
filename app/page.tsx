import CourtItem from '@components/CourtItem';
import PlayerItem from '@components/PlayerItem';
import { Player } from '@prisma/client';
import { Court } from '@utils/types';
import { getBaseURL } from '@utils/util';
import Link from 'next/link';

export default async function Home() {
  const courtesRes = await fetch(`${getBaseURL()}/api/courts`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courts: Court[] = await courtesRes.json();
  const playersRes = await fetch(`${getBaseURL()}/api/users`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const players: Player[] = await playersRes.json();

  return (
    <main>
      <div className='p-2 flex flex-col'>
        <h1 className='text-2xl font-bold my-4 px-2'>Available Courts</h1>
        <div className='carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4'>
          {courts.length > 0 ? (
            courts.map((court, index) => {
              return (
                <div key={index} className='carousel-item'>
                  <CourtItem court={court} />
                </div>
              );
            })
          ) : (
            <div className='text-xl flex justify-center items-center w-full h-40'>
              No courts available ☹️
            </div>
          )}
        </div>

        <h1 className='text-2xl font-bold my-4 px-2'>Registered Players</h1>
        <div className='carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4'>
          {players.length > 0 ? (
            players.map((player, index) => {
              return (
                <div key={index} className='carousel-item'>
                  <Link href={`/users/${player.id}`}>
                    <PlayerItem player={player} size='small' />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className='text-xl flex justify-center items-center w-full h-40'>
              No players available ☹️
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
