import { Court } from '@app/api/courts/route';
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
      {courts.map((court) => {
        return court.location;
      })}
    </main>
  );
}
