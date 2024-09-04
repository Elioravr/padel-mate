import PlayerItem from '@components/PlayerItem';
import { Player } from '@prisma/client';
import { getBaseURL } from '@utils/util';

const Page = async ({ params }: { params: { userId: string } }) => {
  const response = await fetch(`${getBaseURL()}/api/users/${params.userId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });

  if (!response.ok) {
    return <div className='flex'>Player was not found</div>;
  }
  const player: Player = await response.json();

  return <PlayerItem player={player} />;
};

export default Page;
