import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const dummy_meetups = [
  {
    id: "m1",
    title: "a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Toronto_Skyline_Summer_2020.jpg/1200px-Toronto_Skyline_Summer_2020.jpg",
    address: "123 toronto st",
    description: "First meetup",
  },
  {
    id: "m2",
    title: "a second  meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Toronto_Skyline_Summer_2020.jpg/1200px-Toronto_Skyline_Summer_2020.jpg",
    address: "312 toronto ave",
    description: "second meetup",
  },
];

export default function HomePage({ meetups }) {
  return <MeetupList meetups={meetups} />;
}

// runs on every req
// export async function getServerSideProps(context) {
//   // fetch data from API
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: dummy_meetups,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://nextjsstuff:UhEjfpci3BY92ZOQ@cluster0.jfaag30.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
