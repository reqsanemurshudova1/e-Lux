import React, {useEffect, useState} from 'react';
import './Support.css';
import axios from "axios";

const logos = [
  { src: './Assets/Zara.jpg', alt: 'Zara' },
  { src: './Assets/guess.jpg', alt: 'Guess' },
  { src: './Assets/fila.jpg', alt: 'Fila' },
  { src: './Assets/gucci.jpg', alt: 'Gucci' },
  { src: './Assets/champion.jpg', alt: 'Champion' },
  { src: './Assets/chanel.jpg', alt: 'Chanel' },
];

export default function Support() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/partners');
                setData(response.data?.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
    <div className='support container'>
      <div className="support-title">
        We Are Supported By
      </div>
      <div className="support-logos">
        {data.map((logo, index) => (
          <div className="card-logo" key={index}>
            <img src={`http://e_lux_backend.test/storage/${logo.img}`} alt={logo.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
