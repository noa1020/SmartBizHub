import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Business from './Business';
import UserFetcher from './UserFetcher';
import DeleteEntity from './DeleteEntity';
import { MegaMenu } from 'primereact/megamenu';
import './BusinessList.css';

const BusinessList = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:3000/business', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

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

  const handleUserFetched = (user: any) => {
    setCurrentUser(user);
  };

  if (loading) {
    return <div className="loading">Loading businesses...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const isManager = currentUser?.userType === 'Manager' ? true : false;

  const filteredBusinesses = businesses.filter(business =>
    isManager ? business.owner === currentUser?._id : true
  );

  return (
    <div className="business-list-container">
      <UserFetcher onUserFetched={handleUserFetched} />
      <h1>Welcome {currentUser?.username}</h1>
      <h2>Business List</h2>
      {isManager && (
      <div className="add-business-button">
        <Link to="/add-business" className="button">Add New Business</Link>
      </div>
      )}

      <div className="business-cards">
        {filteredBusinesses?.map((business) => (
          <div key={business._id} className="business-card">
            <Link to={`/business/${business._id}`} className="business-link">
              <Business business={business} />
            </Link>
            {isManager && (
            <div className="business-actions">
              <Link to={`/edit-business/${business._id}`} className="button edit-button">Edit</Link>
              <DeleteEntity
                endpoint={`http://localhost:3000/business/${business._id}`}
                entityName="business"
                onDelete={() => setBusinesses(businesses.filter(b => b._id !== business._id))}
              />
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessList;