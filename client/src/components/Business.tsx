import React from 'react';
import './Business.css';

const Business = (props: { business: any }) => {
  const business = props.business;

  return (
    <div className="business-container">
      <div className="business-image">
        <img
          src={business.imageUrl ? `http://localhost:3000${business.imageUrl}` : '/default-image.jpg'} // אם יש תמונה, מציגים אותה, אם לא - תמונה ברירת מחדל
          alt={business.name}
        />
      </div>
      <div className="business-info">
        <h3>{business.name}</h3>
        <p>{business.description}</p>
      </div>
    </div>
  );
};

export default Business;