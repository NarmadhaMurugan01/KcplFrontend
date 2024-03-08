import React, { useState} from 'react';

const ReligionForm = () => {
  const [selectedReligion, setSelectedReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [community, setCommunity] = useState('');
  const [displayedDetails, setDisplayedDetails] = useState([]);

  const handleReligionChange = (e) => {
    setSelectedReligion(e.target.value);
  };

  const handleCasteChange = (e) => {
    setCaste(e.target.value);
  };

  const handleCommunityChange = (e) => {
    setCommunity(e.target.value);
  };

  const handleAddClick = () => {
    if (selectedReligion && caste && community) {
      const newDetails = {
        religion: selectedReligion,
        caste,
        community,
      };

      // Only keep the most recently added details
      setDisplayedDetails([newDetails]);

      setSelectedReligion('');
      setCaste('');
      setCommunity('');
    }
  };
  const religions = [
    'Christianity',
    'Islam',
    'Hinduism',
    'Buddhism',
    'Sikhism',
    'Judaism',
    'Bahá\'í Faith',
    'Jainism',
    'Shinto',
    'Taoism',
    'Zoroastrianism',
    'Confucianism',
    'Rastafari',
    'Animism',
    'Wicca',
    'Druidry',
    'Cao Dai',
    'Tenrikyo',
    'Falun Gong',
    'Scientology'
  ];



  return (
    <div className='my-4'>
            <h2 className="labels pb-3">Religion:</h2>
      <div className="row">
      <div className="col-12 col-md-8 col-lg-3 dmo_flex0 pb-2">
          <select
            id="religion"
            className="form-control"
            value={selectedReligion}
            onChange={handleReligionChange}
          >
            <option value="">Select a religion</option>
            {religions.map((religion, index) => (
              <option key={index} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-8 col-lg-3 dmo_flex0 pb-2">
          <label className="form-label">Caste</label>
          <input
            type="text"
            className="form-control"
            value={caste}
            onChange={handleCasteChange}
            placeholder="Enter Caste"
          />
        </div>

        <div className="col-12 col-md-8 col-lg-3 dmo_flex0 pb-2">
          <label className="form-label dmo_intercaste">Inter-caste</label>
          <input
            type="text"
            className="form-control"
            value={community}
            onChange={handleCommunityChange}
            placeholder="Enter Community"
          />
        </div>
        <div className="col-12 col-md-8 col-lg-3">
          <button className='btn btn-outline-primary' onClick={handleAddClick}>Add Details</button>
        </div>
      </div>

      {displayedDetails.length > 0 && (
        <div>
          <h2 className='labels pt-4'>Displayed Details:</h2>
          {displayedDetails.map((details, index) => (
            <div className='row' key={index}>
              <p className='col-12 col-md-3'>Religion: {details.religion}</p>
              <p className='col-12 col-md-3'>Caste: {details.caste}</p>
              <p className='col-12 col-md-3'>Inter Caste: {details.community}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReligionForm;

