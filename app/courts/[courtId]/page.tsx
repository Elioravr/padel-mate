import CourtItem from '@components/CourtItem';
import PlayersCarousel from '@components/PlayersCarousel';
import { Court } from '@utils/types';
import { getBaseURL } from '@utils/util';

const Page = async ({
  params: { courtId },
}: {
  params: { courtId: string };
}) => {
  const response = await fetch(`${getBaseURL()}/api/courts/${courtId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });

  if (!response.ok) {
    return <div className='flex'>Court was not found</div>;
  }
  const court: Court = await response.json();

  return (
    <div className='flex justify-center flex-col p-3'>
      <div className='flex justify-center'>
        <CourtItem courtId={court.id} size='large' />
      </div>
      <PlayersCarousel
        title='Players in this court'
        players={court.players}
        noPlayersPlaceholder={
          <div className='text-base flex items-center flex-col'>
            <div>No players have joined this court yet.</div>
            <div>Be the first to join! 😎</div>
          </div>
        }
      />
    </div>
  );
};

export default Page;
