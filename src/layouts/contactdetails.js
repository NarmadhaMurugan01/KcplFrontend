import React, { useState } from 'react';

const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    phoneNumber1: '',
    phoneNumber2: '',
    phoneForms: [{ id: 1 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    const { phoneNumber1, phoneNumber2 } = currentContact;

    if (phoneNumber1.trim() === '') {
      return; // Don't add empty phone numbers
    }

    const newContact = {
      phoneNumber1,
      phoneNumber2,
    };

    setContactDetails([newContact]);
    setCurrentContact({ phoneNumber1: '', phoneNumber2: '', phoneForms: [{ id: 1 }] });
  };

  return (
    <div>
      <div className="row my-4 justify-content-start align-items-center">
        <div className="col-md-4 col-12">
          <label className="labels pb-3">Contact Details:</label>
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter your mobile no"
            onChange={handleChange}
            name="phoneNumber1"
            value={currentContact.phoneNumber1}
          />
        </div>
        <div className="col-md-4 col-12 align-self-end pb-2">
          <button className="btn btn-outline-primary" onClick={handleAddContact}>
            Add Contact
          </button>
        </div>
      </div>
      {contactDetails.map((contact, index) => (
        <div className="row" key={index}>
          <p className="col-12 col-md-4">Phone Number: {contact.phoneNumber1}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactForm;
