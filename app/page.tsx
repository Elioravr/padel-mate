import { auth } from '@clerk/nextjs/server';
import CourtsCarousel from '@components/CourtsCarousel';
import PlayersCarousel from '@components/PlayersCarousel';
import { Court, Player } from '@utils/types';
import { getBaseURL } from '@utils/util';
import AddCourtButton from './courts/AddCourtButton';

export default async function Home() {
  const { userId } = auth();

  const courtesRes = await fetch(`${getBaseURL()}/api/courts`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courts: Court[] = await courtesRes.json();
  const upcomingCourtesRes = await fetch(
    `${getBaseURL()}/api/courts/upcoming-courts?userId=${userId}`,
    {
      method: 'GET',
      cache: 'no-store', // Disable caching
    }
  );
  const upcomingCourts: Court[] = await upcomingCourtesRes.json();
  const playersRes = await fetch(`${getBaseURL()}/api/users`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const players: Player[] = await playersRes.json();

  return (
    <main>
      <div className='p-2 md:px-12 lg:px-32 flex flex-col'>
        <AddCourtButton fullSizeButton />
        <CourtsCarousel courts={upcomingCourts} title='My Upcoming Courts' />
        <CourtsCarousel courts={courts} title='Available Public Courts' />
        <PlayersCarousel players={players} title='Registered Players' />
      </div>
    </main>
  );
}
