import { Player } from '@prisma/client';
import Image from 'next/image';

const PlayerItem = ({
  player,
  size = 'large',
  enableRemovePlayerButton = false,
}: {
  player: Player;
  size?: 'small' | 'medium' | 'large';
  enableRemovePlayerButton: boolean;
}) => {
  let sizeClassName = 'w-96';
  if (size === 'medium') {
    sizeClassName = 'w-80';
  } else if (size === 'small') {
    sizeClassName = 'w-60';
  }

  return (
    <div className={`card bg-base-100 ${sizeClassName} shadow-xl`}>
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
        <h2
          className={`card-title flex flex-wrap ${
            size === 'small' ? 'flex-col items-start' : ''
          }`}
        >
          {player.firstName} {player.lastName}
          {player.level === 0 ? (
            <div className='badge badge-info'>Level: Not set</div>
          ) : (
            <div className='badge badge-info'>Level: {player.level}</div>
          )}
        </h2>
        <p>Have already booked 3 games using PadelMate</p>
        <div className='card-actions justify-center'>
          {enableRemovePlayerButton && (
            <button className='btn btn-error'>Remove from game</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerItem;
