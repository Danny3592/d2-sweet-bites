import { TiTick } from 'react-icons/ti';


const CheckBox = ({ id, charitySet, handleAddCharity, className }) => (
  <div
    className={`check-box position-relative ${className}`}
    onClick={() => handleAddCharity(id)}
    style={{ cursor: 'pointer' }}
  >
    {charitySet.includes(id) && (
      <TiTick
        className="position-absolute"
        style={{
          color: 'red',
          fontSize: '40px',
          top: '-10px',
          left: '-8px',
        }}
      />
    )}
  </div>
);

export default CheckBox