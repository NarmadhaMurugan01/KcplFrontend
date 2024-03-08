
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const GadgetSaleForm = () => {
  const [gadgetType, setGadgetType] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [gadgetBrand, setGadgetBrand] = useState('');
  const [model, setModel] = useState('');
  const [agencyOrCompany, setAgencyOrCompany] = useState('');
  const [enteredDetails, setEnteredDetails] = useState([]);
  const [warranty, setWarranty] = useState(''); // Added warranty state


  const handleGadgetTypeChange = (event) => {
    setGadgetType(event.target.value);
  };

  const handleAgencyOrCompanyChange = (event) => {
    setAgencyOrCompany(event.target.value);
  };

  const handleGadgetBrandChange = (event) => {
    setGadgetBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  const handleWarrantyChange = (event) => {
    setWarranty(event.target.value);
  };
  const handlePurchaseDateChange = (event) => {
    setPurchaseDate(event.target.value);
  };

  const handleAddDetails = () => {
    const newDetails = {
      gadgetType,
      gadgetBrand,
      model,
      purchaseDate,
      warranty,
      agencyOrCompany,
    };
  
    setEnteredDetails([newDetails]);
  
    setGadgetType('');
    setGadgetBrand('');
    setModel('');
    setPurchaseDate('');
    setWarranty('');
    setAgencyOrCompany('');
  };

  const handleDeleteClick = () => {
    // Remove the last entered detail
    setEnteredDetails([]);
  };

  const gadgetTypes = [
    'Smartphone',
    'Laptop',
    'Tablet',
    'Smartwatch',
    'Fitness Tracker',
    'Digital Camera',
    'Drone',
    'Gaming Console',
    'E-book Reader',
    'Smart TV',
    'Virtual Reality Headset',
    'Bluetooth Speaker',
    'Smart Home Device',
    'Headphones / Earbuds',
    'Wearables',
    'Router',
    'External Hard Drive',
    'Security Camera',
    'Car Gadget',
  ];
  return (
    <div className='my-4'>
      <div className='row my-3'>
        <div className="labels px-3 col-12 col-md-2">Gadget Details</div>
        

      </div>
      <div className='row dmo_occupation'>
      
        <form className='row pb-2'>
          <div className='col-12 col-md-2 pb-2'>
            <label htmlFor="gadgetType" className='pb-2'>Select Gadget Type:</label>
            <select
              id="gadgetType"
              className="form-select"
              value={gadgetType}
              onChange={handleGadgetTypeChange}
            >
              <option value="">Select Gadget Type</option>
              {gadgetTypes.map((type, index) => (
                <option key={index} value={type.toLowerCase().replace(/\s/g, '')}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className='col-12 col-md-2 pb-2'>
            <label htmlFor="gadgetBrand" className='pb-2'> Brand:</label>
            <input
              className="form-control"
              type="text"
              id="gadgetBrand"
              value={gadgetBrand}
              onChange={handleGadgetBrandChange}
            />
          </div>
          <div className='col-12 col-md-1 pb-2'>
            <label htmlFor="model" className='pb-2'>Model:</label>
            <input
              className="form-control"
              type="text"
              id="model"
              value={model}
              onChange={handleModelChange}
            />
          </div>
          <div className='col-12 col-md-2 pb-2'>
            <label htmlFor="purchaseDate" className='pb-2'>Date of Purchase:</label>
            <input
              className="form-control"
              type="date"
              id="purchaseDate"
              value={purchaseDate}
              onChange={handlePurchaseDateChange}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
          <label htmlFor="warranty" className="pb-2">
            Warranty:
          </label>
          <input
            className="form-control"
            type="date"
            id="warranty"
            value={warranty}
            onChange={handleWarrantyChange}
          />
        </div>
          <div className='col-12 col-md-2 pb-2'>
            <label htmlFor="agencyOrCompany" className='pb-2'>Agency or Company:</label>
            <input
              className="form-control"
              type="text"
              id="agencyOrCompany"
              value={agencyOrCompany}
              onChange={handleAgencyOrCompanyChange}
            />
          </div>
          <div className='col-12 col-md-1 align-self-end pb-2'>
            <button
              className="btn btn-primary profile-button dmo_salebtn"
              type="button"
              onClick={handleAddDetails}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

        </form>
      </div>

      {enteredDetails.length > 0 && (
        <div className="col-12">
          <h2 className="labels">Entered Gadget Details</h2>
          {enteredDetails.map((data, index) => (
            <div className="row" key={index}>
              <p className="col-12 col-md-2">Gadget Type: {data.gadgetType}</p>
              <p className="col-12 col-md-2">Brand: {data.gadgetBrand}</p>
              <p className="col-12 col-md-2">Model: {data.model}</p>
              <p className="col-12 col-md-2">Purchase Date: {data.purchaseDate}</p>
              <p className="col-12 col-md-2">Purchase Date: {data.warranty}</p>
              <p className="col-12 col-md-2">Agency or Company: {data.agencyOrCompany}</p>
              <div className="col-12 col-md-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleDeleteClick}>
                  Delete
                </button>
              </div>
        
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GadgetSaleForm;

