import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditService = () => {
  const { businessId, serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/service/${serviceId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch service details');
        }

        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/service/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      alert('Service updated successfully');
      navigate(`/business/${businessId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Service</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={service.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={service.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;