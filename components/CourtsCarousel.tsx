import { Court } from '@utils/types';
import Link from 'next/link';
import CourtItem from './CourtItem';

const CourtsCarousel = ({
  title,
  courts,
  noCourtsPlaceholder = 'No courts available ☹️',
}: {
  title: string;
  courts: Court[];
  noCourtsPlaceholder?: string;
}) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-bold my-4 px-2'>{title}</h1>
      <div className='carousel carousel-center bg-neutral-100 dark:bg-neutral rounded-box w-full space-x-4 p-4'>
        {courts.length > 0 ? (
          courts.map((court, index) => {
            return (
              <div key={index} className='carousel-item'>
                <Link href={`/courts/${court.id}`}>
                  <CourtItem courtId={court.id} />
                </Link>
              </div>
            );
          })
        ) : (
          <div className='text-xl flex justify-center items-center w-full h-40'>
            {noCourtsPlaceholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtsCarousel;
