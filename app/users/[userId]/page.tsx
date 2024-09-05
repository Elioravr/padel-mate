import CourtsCarousel from '@components/CourtsCarousel';
import PlayerItem from '@components/PlayerItem';
import { Player } from '@prisma/client';
import { Court } from '@utils/types';
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

  if (!response.ok) {
    return <div className='flex'>Player was not found</div>;
  }
  const player: Player = await response.json();

  return (
    <div className='flex flex-col p-2'>
      <PlayerItem player={player} />

      <CourtsCarousel
        title={`Courts created by ${player.firstName}`}
        courts={courtesOwnedByPlayer}
      />
    </div>
  );
};

export default Page;
