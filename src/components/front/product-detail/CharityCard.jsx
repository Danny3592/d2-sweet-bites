import { useState } from 'react';
import CheckBox from './Checkbox';

const CharityCard = ({ title, price, img, id, setCharitySet, charitySet }) => {
  const handleAddCharity = (id) => {
    setCharitySet((prevSet) => {
      return prevSet.includes(id)
        ? prevSet.filter((item) => item !== id)
        : [...prevSet, id];
    });
  };

  return (
    <>
      {/* 電腦版 Checkbox */}
      <CheckBox
        id={id}
        charitySet={charitySet}
        handleAddCharity={handleAddCharity}
        className="d-none d-sm-block"
      />

      <div style={{ height: '100px', width: '150px' }}>
        <img src={img} alt="" className="charity-img" />
      </div>
      <div className="h-100 d-flex flex-column justify-content-between">
        <p className="text-dark mb-6 fs-6">{title}</p>
        <p className="text-primary fs-6">
          <span className="fs-7 me-1">NT$</span>
          {price}
        </p>
      </div>

      {/* 手機版 Checkbox */}
      <CheckBox
        id={id}
        charitySet={charitySet}
        handleAddCharity={handleAddCharity}
        className="d-block d-sm-none m-0"
      />
    </>
  );
};

export default CharityCard;
