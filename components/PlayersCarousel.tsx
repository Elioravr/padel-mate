import PlayerItem from '@components/PlayerItem';
import { Player } from '@prisma/client';
import Link from 'next/link';

const PlayersCarousel = ({
  title,
  players,
  noPlayersPlaceholder = 'No players available ☹️',
  enableRemovePlayerButton = false,
  courtId,
  onCourtUpdate,
}: {
  title?: string;
  players: Player[];
  noPlayersPlaceholder?: string | React.ReactElement;
  enableRemovePlayerButton?: boolean;
  courtId?: string; // in the context of court, in order to remove the player
  onCourtUpdate?: Function; // in the context of court, after the removal of the player
}) => {
  return (
    <>
      {title != null && (
        <h1 className='text-2xl font-bold my-4 px-2'>{title}</h1>
      )}
      <div
        className={`carousel carousel-center bg-neutral-100 dark:bg-neutral rounded-box w-full space-x-4 p-4`}
      >
        {players.length > 0 ? (
          players.map((player, index) => {
            return (
              <div key={index} className='carousel-item'>
                <Link href={`/users/${player.id}`}>
                  <PlayerItem
                    player={player}
                    size='small'
                    enableRemovePlayerButton={enableRemovePlayerButton}
                    courtId={courtId}
                    onCourtUpdate={onCourtUpdate}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div className='text-xl flex justify-center items-center w-full h-40'>
            {noPlayersPlaceholder}
          </div>
        )}
      </div>
    </>
  );
};

export default PlayersCarousel;
