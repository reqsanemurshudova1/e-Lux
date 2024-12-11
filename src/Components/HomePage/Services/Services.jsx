import React, {useEffect, useState} from "react";
import "./Services.css";
import axios from "axios";

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

  const [itemData, setItemData] = useState([]);
  const [mainData, setMainData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/our-services');
        setItemData(response.data?.data);
        setMainData(response?.data?.ourServices[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
  <div className="services container">
  <div className="our-services">
    <h1>{mainData?.header ? mainData.header : 'Xidmətlərimiz'}</h1>
    <p>
      {mainData?.description ? mainData.description : 'Biz mükəmməl və zövqlü alış-veriş təcrübəsinin vacibliyini anlayırıq.'}
    </p>
  </div>
  <div className="service-cards">
    {itemData.map((service) => (
      <div className="card" key={service.id}>
        {/* <img src={service.icon} alt="" /> */}
        <i class={service.icon}></i>
        <h3>{service.header}</h3>
        <p>{service.description}</p>
      </div>
    ))}
  </div>
</div>

  );
}
