import RemovePlayerFromGameButton from '@app/api/users/RemovePlayerFromGameButton';
import { Player } from '@utils/types';
import Image from 'next/image';

const PlayerItem = ({
  player,
  size = 'large',
  enableRemovePlayerButton = false,
  courtId,
  onCourtUpdate,
}: {
  player: Player;
  size?: 'small' | 'medium' | 'large';
  enableRemovePlayerButton?: boolean;
  courtId?: string; // in the context of court, in order to remove the player
  onCourtUpdate?: Function; // in the context of court, after the removal of the player
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
        <p>Has already booked {player._count?.courts} games using PadelMate</p>
        <div className='card-actions justify-center'>
          {enableRemovePlayerButton && courtId != null && (
            <RemovePlayerFromGameButton
              playerId={player.id}
              courtId={courtId}
              onCourtUpdate={onCourtUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerItem;
