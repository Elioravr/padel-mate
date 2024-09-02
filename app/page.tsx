export default async function Home() {
  const courtesRes = await fetch(`${process.env.URL}/api/courts`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courts = await courtesRes.json();

  return (
    <main>
      {courts.map((court) => {
        return court.location;
      })}
    </main>
  );
}
