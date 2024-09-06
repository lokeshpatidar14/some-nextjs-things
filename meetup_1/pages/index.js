import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
function Home() {
  const DUMMY_MEETUPS = [{
    id: "m1",
    title: "A First Meetup",
    image:
      "https://lh3.googleusercontent.com/12rTrXLIKlddp-wRL15tXAMjB0baUOWsfxaWClxAqqbPpFTpQP49jFht6mKR-N5WS2pTUFk-3oPut6qYSlVjLG-DuQfs0pyTPIkbUoy6AbywzgIqHVq4=w600-l90-sg-rj-c0xffffff",
    address: "Autralia",
    description: "it a first meetup "
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://lh3.googleusercontent.com/12rTrXLIKlddp-wRL15tXAMjB0baUOWsfxaWClxAqqbPpFTpQP49jFht6mKR-N5WS2pTUFk-3oPut6qYSlVjLG-DuQfs0pyTPIkbUoy6AbywzgIqHVq4=w600-l90-sg-rj-c0xffffff",
    address: "Autralia",
    description: "it a Second meetup "
  }]

  return (
    
      <MeetupList meetups={DUMMY_MEETUPS} />
   
  );
}
export default Home;
