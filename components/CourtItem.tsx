import { Court } from '@utils/MockData';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../utils/util';

function CourtItem({ court }: { court: Court }) {
  return (
    <div className='card bg-base-100 image-full w-80 shadow-xl'>
      <figure>
        <Image
          src='/images/padel-court.jpg'
          width={300}
          height={300}
          style={{ width: '100%', height: 240 }}
          alt='padel-background'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{`${court.owner.firstName} ${court.owner.lastName}'s Court`}</h2>
        <div className='flex flex-wrap gap-1'>
          {court.players.map((player, index) => {
            return (
              <Link href={`/users/${player.id}`} key={index}>
                <div className='badge badge-neutral'>
                  {player.firstName} {player.lastName}
                </div>
              </Link>
            );
          })}
        </div>
        <p>{formatDate(court.date)}</p>
        <div className='card-actions justify-end'>
          {court.players.length === 4 ? (
            <div className='badge badge-accent'>Fully booked</div>
          ) : (
            <button className='btn btn-primary'>Join Court</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourtItem;
