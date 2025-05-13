import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBusiness = () => {
  const { businessId } = useParams<{ businessId: string }>();  // Extract businessId from URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!businessId) {
      alert('Business ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/business/${businessId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete business');
      }

      alert('Business deleted successfully');
      navigate('/businessList');
    } catch (err) {
      alert('Error deleting business: ' + err.message);
    }
  };

  return <button onClick={handleDelete}>Are you sure you want to delete this business?</button>;
};

export default DeleteBusiness;