// src/components/ManagerBusinessList.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Business from './Business';
import DeleteEntity from './DeleteEntity';

const ManagerBusinessList = () => {
  const { currentUser } = useContext(UserContext)!;
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:3000/business');
        if (!response.ok) throw new Error('Failed to fetch businesses');
        const data = await response.json();
        setBusinesses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) return <div>Loading businesses...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredBusinesses = businesses.filter(
    (business) => business.owner === currentUser?._id
  );

  return (
    <div>
      <h1>Welcome Manager {currentUser?.username}</h1>
      <Link to="/add-business" className="button">Add New Business</Link>
      {filteredBusinesses.map((business) => (
        <div key={business._id}>
          <Link to={`/business/${business._id}`}>
            <Business business={business} />
          </Link>
          <Link to={`/edit-business/${business._id}`} className="button">Edit</Link>
          <DeleteEntity
            endpoint={`http://localhost:3000/business/${business._id}`}
            entityName="business"
            onDelete={() => setBusinesses(businesses.filter(b => b._id !== business._id))}
          />
        </div>
      ))}
    </div>
  );
};

export default ManagerBusinessList;
