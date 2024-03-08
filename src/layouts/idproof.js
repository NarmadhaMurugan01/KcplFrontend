import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const IdProofForm = () => {
  const [idProof, setIdProof] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const[documentname,setDocumentName]=useState("");
  const [addedDetailsIndices, setAddedDetailsIndices] = useState([]);
  const [issueDate, setIssueDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [collectedData, setCollectedData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        // Extract unique country names from the fetched data
        const uniqueCountries = data.map((country) => country.name.common);

        // Set the unique country names in the state
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    // Fetch countries when the component mounts
    fetchCountries();
  }, []);

  // Event handler for selecting a country from the dropdown
  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Event handler for selecting an ID proof from the dropdown
  const handleIdProofChange = (event) => {
    const selectedIdProof = event.target.value;

    // Show additional details section when an ID proof is selected
    setShowDetails(selectedIdProof !== "");

    // Update the selected ID proof
    setIdProof(selectedIdProof);

    // Automatically set the document name based on the selected ID proof
    if (selectedIdProof === "passport") {
      setDocumentName("Passport");
    } else if (selectedIdProof === "drivingLicense") {
      setDocumentName("Driving License");
    } else if (selectedIdProof === "aadharCard") {
      setDocumentName("Aadhar Card");
    } else if (selectedIdProof === "nationalIdCard") {
      setDocumentName("National ID Card");
    } else {
      setDocumentName(""); // Reset document name if no ID proof is selected
    }
  };
  // Event handlers for input changes
  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };
  const handleIdNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleIssueDateChange = (event) => {
    setIssueDate(event.target.value);
  };

  const handleExpireDateChange = (event) => {
    setExpireDate(event.target.value);
  };

  const handleIssuingAuthorityChange = (event) => {
    setIssuingAuthority(event.target.value);
  };

  
  // Event handler for adding a new document
  const handleAddClick = () => {
    // Validate issue date and expire date
    if (!issueDate || !expireDate || new Date(issueDate) >= new Date(expireDate)) {
      alert("Please enter valid issue date and expire date.");
      return;
    }

    const newData = {
      idProof,
      idNumber,
      documentname, // Automatically set based on the selected ID proof
      issueDate,
      expireDate,
      country: selectedCountry,
      issuingAuthority,
    };

    // Update the collected data array with only the new data
    setCollectedData([...collectedData, newData]);

    // Track the index of the recently added detail
    setAddedDetailsIndices([...addedDetailsIndices, collectedData.length]);

    // Clear the input fields and reset the form state
    setIdProof("");
    setIdNumber("");
    setIssueDate("");
    setExpireDate("");
    setSelectedCountry("");
    setIssuingAuthority("");
    setDocumentName(""); // Reset document name
  };
  const handleDeleteClick = (index) => {
    // Filter out the detail with the specified index
    const updatedData = collectedData.filter((_, i) => i !== index);
    setCollectedData(updatedData);
  };
  

  return (
    <div>
      <div className="row dmo_occupation">
        <div className="row">
          <div className="col-12 col-md-2">
            <label className="labels" htmlFor="idProof">
              Add ID Document:
            </label>
            <select
              id="idProof"
              className="form-select col-md-4 form-control"
              value={idProof}
              onChange={handleIdProofChange}
            >
              <option value="">Select ID Proof</option>
              <option value="passport">Passport</option>
              <option value="drivingLicense">Driving License</option>
              <option value="aadharCard">Aadhar Card</option>
              <option value="nationalIdCard">National ID Card</option>
            </select>
          </div>
        </div>
        {showDetails && (
          <div className="px-3">
            <div className="row py-4">
              <div className="col-12 col-md-1">
                <label className="form-label" htmlFor="idNumber">
                  ID Number:
                </label>
                <input
                  type="text"
                  id="idNumber"
                  className="form-control"
                  value={idNumber}
                  onChange={handleIdNumberChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label className="form-label" htmlFor="idNumber">
                  Document Name:
                </label>
                <input
                  type="text"
                  id="idNumber"
                  className="form-control"
                  value={documentname}
                  onChange={handleIdNameChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label className="form-label" htmlFor="issueDate">
                  Issue Date:
                </label>
                <input
                  type="date"
                  id="issueDate"
                  className="form-control"
                  value={issueDate}
                  onChange={handleIssueDateChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="countryDropdown" className="form-label">
                  Select a Country:
                </label>
                <select
                  className="form-control"
                  id="countryDropdown"
                  onChange={handleChange}
                  value={selectedCountry}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label className="form-label" htmlFor="expireDate">
                  Expire Date:
                </label>
                <input
                  type="date"
                  id="expireDate"
                  className="form-control"
                  value={expireDate}
                  onChange={handleExpireDateChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label className="form-label" htmlFor="issuingAuthority">
                  Issuing Authority:
                </label>
                <input
                  type="text"
                  id="issuingAuthority"
                  className="form-control"
                  value={issuingAuthority}
                  onChange={handleIssuingAuthorityChange}
                />
              </div>
              <div className="col-12 col-md-1 align-self-end">
                <button
                className="btn btn-primary profile-button dmo_salebtn"
                type="button"
                onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

            </div>
          </div>
        )}

{showDetails && collectedData.length > 0 && (
  <div className="col-12">
    <h2 className="labels">Document Details</h2>
    <div className="row">
      <p className="col-12 col-md-2">ID Number: {collectedData[0].idNumber}</p>
      <p className="col-12 col-md-2">Doc Name: {collectedData[0].documentname}</p>
      <p className="col-12 col-md-2">Issue Date: {collectedData[0].issueDate}</p>
      <p className="col-12 col-md-2">Expire Date: {collectedData[0].expireDate}</p>
      <p className="col-12 col-md-2">Country: {collectedData[0].country}</p>
      <p className="col-12 col-md-2">Issuing Authority: {collectedData[0].issuingAuthority}</p>
      <div className="col-12 col-md-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => handleDeleteClick(0)}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default IdProofForm;
