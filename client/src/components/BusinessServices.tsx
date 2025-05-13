import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DeleteEntity from './DeleteEntity';
import './BusinessServices.css';

const BusinessServices = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const businessResponse = await fetch(`http://localhost:3000/business?businessId=${businessId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!businessResponse.ok) {
          throw new Error('Failed to fetch business details');
        }

        const businessData = await businessResponse.json();
        setBusiness(businessData);

        const servicesResponse = await fetch(`http://localhost:3000/service/business/${businessId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }

        const servicesData = await servicesResponse.json();
        setServices(servicesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="business-services-container">
      {business && (
        <div className="business-details">
          <div className="business-header">
            <h1>{business.name}</h1>
            <div className="business-logo">
              <img
                src={business.imageUrl ? `http://localhost:3000${business.imageUrl}` : '/default-image.jpg'}
                alt={business.name}
              />
            </div>
          </div>
          <div className="business-description">
            <p>{business.description}</p>
          </div>

          <div className="services-list">
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service._id} className="service-item">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p>Price: ${service.price}</p>
                  <Link to={`/edit-service/${businessId}/${service._id}`} className="edit-link">
                    Edit Service
                  </Link>
                  <DeleteEntity
                    endpoint={`http://localhost:3000/service/${service._id}`}
                    entityName="service"
                    redirectPath={`/business/${businessId}`}
                    onDelete={() => setServices(services.filter(s => s._id !== service._id))}
                  />
                </div>
              ))
            ) : (
              <p>No services available for this business.</p>
            )}
          </div>

          <h2>Add New Service</h2>
          <Link to={`/add-service/${businessId}`} className="add-service-link">
            Add Service
          </Link>
        </div>
      )}

      <nav className="contact-info">
        <h3>For Contact</h3>
        <p><strong>Email:</strong> {business?.email}</p>
        <p><strong>Phone:</strong> {business?.phoneNumber}</p>
        <p><strong>Address:</strong> {business?.address}</p>
      </nav>
    </div>
  );
};

export default BusinessServices;