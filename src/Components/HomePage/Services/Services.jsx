import React from "react";
import "./Services.css";

const servicesData = [
  {
    id: 1,
    icon: "./Assets/return.svg",
    title: "Free Returns",
    description:
      "Our customers can return or exchange their purchases hassle-free, with our easy-to-use return policy.",
  },
  {
    id: 2,
    icon: "./Assets/privacy.svg",
    title: "Secure Payment",
    description:
      "We offer a secure checkout process that protects our customers' personal and financial information.",
  },
  {
    id: 3,
    icon: "./Assets/Group.svg",
    title: "Customer Support",
    description:
      "Our dedicated customer support team is available to assist you with any questions or concerns you may have.",
  },
];

export default function Services() {
  return (
    <div className="services container">
      <div className="our-services">
        <h1>Our Services</h1>
        <p>
          We understand the importance of a seamless and enjoyable shopping
          experience.
        </p>
      </div>
      <div className="service-cards">
        {servicesData.map((service) => (
          <div className="card" key={service.id}>
            <img src={service.icon} alt="" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
