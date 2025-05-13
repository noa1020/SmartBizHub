import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBusiness = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  
  const [business, setBusiness] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await fetch(`http://localhost:3000/business?businessId=${businessId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
          throw new Error('Failed to fetch business');
        }
        const data = await response.json();
        setBusiness(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBusiness();
  }, [businessId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:3000/business/${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(business),
      });

      if (!response.ok) {
        throw new Error('Failed to update business');
      }

      alert('Business updated successfully');
      navigate(`/business/${businessId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Business</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={business.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          value={business.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          value={business.address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={business.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={business.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Business</button>
      </form>
    </div>
  );
};

export default EditBusiness;