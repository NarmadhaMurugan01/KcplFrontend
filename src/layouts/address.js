import React, { useState } from "react";

const AddressForm = () => {
  const [addressDetails, setAddressDetails] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    addresses: [{ id: 1 }],
  });

  const tamilNaduDistricts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleAddAddress = () => {
    const { street, city, state, zipCode, addresses } = currentAddress;

    const newAddress = {
      street,
      city,
      state,
      zipCode,
      allAddresses: addresses.map((form) => form.address).filter(Boolean),
    };

    setAddressDetails([newAddress]);
    setCurrentAddress({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      addresses: [{ id: 1 }],
    });
  };

  return (
    <div>
      <div className="row my-4 justify-content-start align-items-center">
        <div className="row">
          <label className="labels pb-2 px-3">Address Details:</label>
          <div className="col-12 col-md-2 pb-2">
            <input
              type="text"
              className="form-control col-12 col-md-3"
              placeholder="Street"
              onChange={handleChange}
              name="street"
              value={currentAddress.street}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Place/Village"
              onChange={handleChange}
              name="placeVillage"
              value={currentAddress.placeVillage}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Taluk"
              onChange={handleChange}
              name="taluk"
              value={currentAddress.taluk}
            />
          </div>

          {/* <div className='col-12 col-md-2 pb-2'>
          <input
            type="text"
            className="form-control"
            placeholder="State"
            onChange={handleChange}
            name="state"
            value={currentAddress.state}
          />
          </div> */}
          <div className="col-12 col-md-2 pb-2">
            {/* <label className="pb-2 label">District</label> */}
            <select
              className="header_company form-control"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {tamilNaduDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-2 pb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Zip Code"
              onChange={handleChange}
              name="zipCode"
              value={currentAddress.zipCode}
            />
          </div>

          <div className="col-md-2 col-12">
            <button
              className="btn btn-outline-primary"
              onClick={handleAddAddress}
            >
              Add Address
            </button>
          </div>
        </div>
      </div>

      {addressDetails.map((address, index) => (
        <div className="row" key={index}>
          <h2 className="labels px-3">Address Details:</h2>
          <p className="col-12 col-md-3 px-3">Street: {address.street}</p>
          <p className="col-12 col-md-2">City: {address.city}</p>
          <p className="col-12 col-md-2">State: {address.state}</p>
          <p className="col-12 col-md-2">Zip Code: {address.zipCode}</p>
          {address.allAddresses && (
            <div>
              {address.allAddresses.map((addr, idx) => (
                <p className="col-12 col-md-4" key={idx}>
                  Additional Address {idx + 1}: {addr}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressForm;
