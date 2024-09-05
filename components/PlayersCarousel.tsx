import PlayerItem from '@components/PlayerItem';
import { Player } from '@prisma/client';
import Link from 'next/link';

const PlayersCarousel = ({
  title,
  players,
  noPlayersPlaceholder = 'No players available ☹️',
}: {
  title?: string;
  players: Player[];
  noPlayersPlaceholder?: string | React.ReactElement;
}) => {
  return (
    <>
      {title != null && (
        <h1 className='text-2xl font-bold my-4 px-2'>{title}</h1>
      )}
      <div
        className={`carousel carousel-center rounded-box w-full space-x-4 p-4`}
      >
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
            {noPlayersPlaceholder}
          </div>
        )}
      </div>
    </>
  );
};

export default PlayersCarousel;
