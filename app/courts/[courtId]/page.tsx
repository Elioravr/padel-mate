import CourtItem from '@components/CourtItem';
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
    <div className='flex justify-center'>
      <CourtItem court={court} size='large' />
    </div>
  );
};

export default Page;
