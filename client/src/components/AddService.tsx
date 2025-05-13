import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddService = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [error, setError] = useState(null);

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
      const response = await fetch(`http://localhost:3000/service`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          business: businessId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add service');
      }

      alert('Service added successfully');
      navigate(`/business/${businessId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Add Service</h2>
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
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;