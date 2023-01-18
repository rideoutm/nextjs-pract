import React from "react";
import styles from "./meetupdetails.module.css";

export default function MeetupDetails({ image, title, address, description }) {
  return (
    <section className={styles.details}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
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
        id: meetupId,
        title: "1st meet up",
        address: "123 meet st",
        description: "first meet up",
      },
    },
  };
}
