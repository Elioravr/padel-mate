import CourtsCarousel from '@components/CourtsCarousel';
import PlayerItem from '@components/PlayerItem';
import { Court, Player } from '@utils/types';
import { getBaseURL } from '@utils/util';

const Page = async ({ params }: { params: { userId: string } }) => {
  const response = await fetch(`${getBaseURL()}/api/users/${params.userId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });

  const courtesOwnedByPlayerRes = await fetch(
    `${getBaseURL()}/api/courts/courts-owned-by-player?ownerId=${
      params.userId
    }`,
    {
      method: 'GET',
      cache: 'no-store', // Disable caching
    }
  );
  const courtesOwnedByPlayer: Court[] = await courtesOwnedByPlayerRes.json();

  const upcomingCourtsRes = await fetch(
    `${getBaseURL()}/api/courts/upcoming-courts?userId=${params.userId}`,
    {
      method: 'GET',
      cache: 'no-store', // Disable caching
    }
  );
  const upcomingCourts: Court[] = await upcomingCourtsRes.json();

  if (!response.ok) {
    return <div className='flex'>Player was not found</div>;
  }
  const player: Player = await response.json();

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-center'>
        <PlayerItem player={player} />
      </div>

      <CourtsCarousel
        title={`Upcoming Courts for ${player.firstName}`}
        courts={upcomingCourts}
      />

      <CourtsCarousel
        title={`Courts created by ${player.firstName}`}
        courts={courtesOwnedByPlayer}
      />
    </div>
  );
};

export default Page;
