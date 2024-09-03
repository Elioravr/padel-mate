import { Court } from '@app/api/courts/route';
import CourtItem from '@components/CourtItem';
import Navbar from '@components/Navbar';

export default async function Home() {
  const courtesRes = await fetch(`${process.env.URL}/api/courts`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courts: Court[] = await courtesRes.json();

  return (
    <main>
      <Navbar />
      <div className='p-2 flex flex-col items-center'>
        <h1 className='text-2xl font-bold my-4'>Available Courts</h1>
        <div className='flex justify-center flex-wrap gap-2'>
          {courts.map((court, index) => {
            return <CourtItem key={index} court={court} />;
          })}
        </div>
      </div>
    </main>
  );
}
