import CourtItem from '@components/CourtItem';
import { Court } from '@prisma/client';
import { getBaseURL } from '@utils/util';

export default async function Home() {
  const courtesRes = await fetch(`${getBaseURL()}/api/courts`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courts: Court[] = await courtesRes.json();

  return (
    <main>
      <div className='p-2 flex flex-col items-center'>
        <h1 className='text-2xl font-bold my-4'>Available Courts</h1>
        <div className='flex justify-center flex-wrap gap-4'>
          {courts.map((court, index) => {
            return <CourtItem key={index} court={court} />;
          })}
        </div>
      </div>
    </main>
  );
}
