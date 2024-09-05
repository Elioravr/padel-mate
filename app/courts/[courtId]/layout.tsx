import { Court } from '@utils/types';
import { formatDate, formatShortDate, getBaseURL } from '@utils/util';
import Head from 'next/head';

const Layout = async ({
  children,
  params: { courtId },
}: {
  children: React.ReactElement;
  params: { courtId: string };
}) => {
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

  return (
    <>
      <Head>
        {/* Title and description */}
        <meta property='og:title' content={courtName} />
        <meta property='og:description' content={courtDescription} />

        {/* URL of the court page */}
        <meta
          property='og:url'
          content={`https://padelmate.elioravr.com/courts/${courtId}`}
        />

        {/* Preview image */}
        <meta property='og:image' content={courtImage} />

        {/* Optional: Image dimensions */}
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />

        {/* Optional: Type of content */}
        <meta property='og:type' content='website' />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
