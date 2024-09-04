import { Player } from '@prisma/client';
import { getBaseURL } from '@utils/util';
import Image from 'next/image';

const Page = async ({ params }: { params: { userId: string } }) => {
  const response = await fetch(`${getBaseURL()}/api/users/${params.userId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });

  if (!response.ok) {
    return <div className='flex'>Player was not found</div>;
  }
  const player: Player = await response.json();

  return (
    <div className='card bg-base-100 w-96 shadow-xl'>
      <figure>
        <Image
          src='/images/player-no-image-placeholder.jpg'
          alt='Shoes'
          width={300}
          height={300}
          style={{ width: '100%', height: 'auto' }}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {player.firstName} {player.lastName}
          <div className='badge badge-info'>Level: {player.level}</div>
        </h2>
        <p>Have already booked 3 games using PadelMate</p>
        <div className='card-actions justify-end'></div>
      </div>
    </div>
  );
};

export default Page;
