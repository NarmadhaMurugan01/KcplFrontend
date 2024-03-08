import React, { useState } from 'react';

const EmailForm = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    phoneNumber1: '',
    phoneNumber2: '',
    email: '',
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
    const { phoneNumber1, phoneNumber2, email, phoneForms } = currentContact;

    if (!email.trim()) {
      return; // Don't add empty emails
    }

    const newContact = {
      phoneNumber1,
      phoneNumber2,
      email,
      phoneNumbers: phoneForms.map((form) => form.phoneNumber).filter(Boolean),
    };

    setContactDetails([newContact]);
    setCurrentContact({ phoneNumber1: '', phoneNumber2: '', email: '', phoneForms: [{ id: 1 }] });
  };

  return (
    <div>
      <div className="row my-4 justify-content-start align-items-center">
        <div className="col-md-4 col-12">
          <label className="labels pb-3">Email Details:</label>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Enter your Email Id"
            onChange={handleChange}
            name="email"
            value={currentContact.email}
          />
        </div>
      
        <div className="col-md-4 col-12 align-self-end pb-2">
          <button className="btn btn-outline-primary" onClick={handleAddContact}>
            Add Email
          </button>
        </div>
      </div>

      {contactDetails.map((contact, index) => (
        <div key={index}>
          <p className='pb-3'>Email Id: {contact.email}</p>
          {contact.phoneNumbers && (
            <div>
              {contact.phoneNumbers.map((phone, idx) => (
                <p key={idx}>Email Id {idx + 1}: {phone}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmailForm;
