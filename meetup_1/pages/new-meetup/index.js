import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  const handleMeetupForm = (meetupS) => {
    console.log(meetupS);
  };
  return <NewMeetupForm onAddMeetup={handleMeetupForm} />;
}
