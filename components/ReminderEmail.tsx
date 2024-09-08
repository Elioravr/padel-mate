import { Button, Heading, Img, Section, Text } from '@react-email/components';
import { Court } from '@utils/types';
import { formatDate, formatHour, getBaseURL } from '@utils/util';

const ReminderEmail = async ({ courtId }: { courtId: string }) => {
  const response = await fetch(`${getBaseURL()}/api/courts/${courtId}`, {
    method: 'GET',
    cache: 'no-store', // Disable caching
  });
  const court: Court = await response.json();

  return (
    <Section style={{ marginTop: 16, marginBottom: 16 }}>
      <Img
        alt='Padel Court'
        height='320'
        src={`https://padelmate.elioravr.com/images/padel-court.jpg`}
        style={{
          width: '100%',
          borderRadius: 12,
          objectFit: 'cover',
        }}
      />
      <Section
        style={{
          marginTop: 32,
          textAlign: 'center',
        }}
      >
        <Heading
          as='h1'
          style={{
            margin: 0,
            marginTop: 8,
            fontSize: 36,
            lineHeight: '36px',
            fontWeight: 600,
            color: 'rgb(17,24,39)',
          }}
        >
          {`We’re excited to remind you that you’ve been added to a Padel court session at ${court.location}!`}
        </Heading>
        <Heading
          as='h2'
          style={{
            margin: 0,
            marginTop: 3,
            fontSize: 24,
            fontWeight: 600,
            color: '#a4a1a1',
          }}
        >
          {formatDate(court.date)} - {formatHour(court.date, court.duration)}
        </Heading>
        <Section style={{ marginTop: 5, marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: '24px',
              color: 'rgb(107,114,128)',
            }}
          >
            Here are the details of your upcoming match:
            <br />
            <br />
            <b>Court Location:</b> {court.location} <br />
            <b>Date:</b> {formatDate(court.date)} <br />
            <b>Duration:</b> {court.duration} minutes <br />
            <br /> <br />
            You can also find the event attached as a calendar invite for your
            convenience.
            <br /> <br />
            If you have any questions or need to make changes, feel free to
            reach out to us. We look forward to seeing you on the court!
          </Text>
        </Section>
        <Button
          href={`https://padelmate.elioravr.com/courts/${court.id}`}
          style={{
            marginTop: 16,
            borderRadius: 8,
            backgroundColor: 'rgb(79,70,229)',
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 12,
            paddingBottom: 12,
            fontWeight: 600,
            color: 'rgb(255,255,255)',
          }}
        >
          See more details at PadelMate
        </Button>
        <Img
          alt='Padel Court'
          height='50'
          src={`https://padelmate.elioravr.com/icons/app-logo-1.jpg`}
          style={{
            width: 50,
            borderRadius: 12,
            objectFit: 'cover',
            margin: 'auto',
            marginTop: 10,
          }}
        />
      </Section>
    </Section>
  );
};

export default ReminderEmail;
