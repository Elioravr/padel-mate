import { Court } from '@utils/types';
import { formatDate, formatShortDate, getBaseURL } from '@utils/util';
import { Metadata } from 'next/types';

type Props = {
  params: { courtId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const courtId = params.courtId;

  const courteRes = await fetch(`${getBaseURL()}/api/courts/${courtId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const courtData: Court = await courteRes.json();

  const courtName = `${courtData.owner.firstName} ${
    courtData.owner.lastName
  }'s Court - ${formatShortDate(courtData.date)}`;
  const courtImage = '/images/padel-court.jpg';
  const courtDescription = formatDate(courtData.date);

  return {
    title: courtName,
    metadataBase: new URL('https://padelmate.elioravr.com/'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: courtName,
      description: courtDescription,
      images: [courtImage],
      url: `https://padelmate.elioravr.com/courts/${courtId}`,
    },
  };
}

const Layout = async ({
  children,
  params: { courtId },
}: {
  children: React.ReactElement;
  params: { courtId: string };
}) => {
  return <main>{children}</main>;
};

export default Layout;
