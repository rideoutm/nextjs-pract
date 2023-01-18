import React from "react";
import styles from "./meetupdetails.module.css";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props) {
  return (
    <section className={styles.details}>
      <img src={props.meetupData.image} alt={props.meetupData.title} />
      <h1>{props.meetupData.title}</h1>
      <address>{props.meetupData.address}</address>
      <p>{props.meetupData.description}</p>
    </section>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjsstuff:UhEjfpci3BY92ZOQ@cluster0.jfaag30.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://nextjsstuff:UhEjfpci3BY92ZOQ@cluster0.jfaag30.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
