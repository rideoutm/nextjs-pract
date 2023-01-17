import React from "react";
import styles from "./meetupdetails.module.css";

export default function MeetupDetails() {
  return (
    <section className={styles.details}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Toronto_Skyline_Summer_2020.jpg/1200px-Toronto_Skyline_Summer_2020.jpg"
        alt="first meet"
      />
      <h1>first meet up</h1>
      <address>1234 some st.</address>
      <p>Meetup Description</p>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Toronto_Skyline_Summer_2020.jpg/1200px-Toronto_Skyline_Summer_2020.jpg",
        id: "m1",
        title: "1st meet up",
        address: "123 meet st",
        description: "first meet up",
      },
    },
  };
}
