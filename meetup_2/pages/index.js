import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://lh3.googleusercontent.com/12rTrXLIKlddp-wRL15tXAMjB0baUOWsfxaWClxAqqbPpFTpQP49jFht6mKR-N5WS2pTUFk-3oPut6qYSlVjLG-DuQfs0pyTPIkbUoy6AbywzgIqHVq4=w600-l90-sg-rj-c0xffffff",
    address: "Australia",
    description: "It's a first meetup.",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://lh3.googleusercontent.com/12rTrXLIKlddp-wRL15tXAMjB0baUOWsfxaWClxAqqbPpFTpQP49jFht6mKR-N5WS2pTUFk-3oPut6qYSlVjLG-DuQfs0pyTPIkbUoy6AbywzgIqHVq4=w600-l90-sg-rj-c0xffffff",
    address: "Australia",
    description: "It's a second meetup.",
  },
];

function Home({ meetups }) {  
  return <MeetupList meetups={meetups} />;
}

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}

export default Home;
