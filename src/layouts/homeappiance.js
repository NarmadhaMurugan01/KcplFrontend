import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const HomeApplianceSaleForm = () => {
  const [applianceType, setApplianceType] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [agencyOrCompany, setAgencyOrCompany] = useState("");
  const [gadgetBrand, setGadgetBrand] = useState("");
  const [model, setModel] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [applianceDetails, setApplianceDetails] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState("");

  const handleApplianceTypeChange = (event) => {
    setApplianceType(event.target.value);
  };
  const handleApplianceChange = (event) => {
    setSelectedAppliance(event.target.value);
  };

  const handleGadgetBrandChange = (event) => {
    setGadgetBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handlePurchaseDateChange = (event) => {
    setPurchaseDate(event.target.value);
  };

  const handleAgencyOrCompanyChange = (event) => {
    setAgencyOrCompany(event.target.value);
  };

  const handleWarrantyPeriodChange = (event) => {
    setWarrantyPeriod(event.target.value);
  };

  const handleAddDetails = () => {
    const newApplianceDetails = {
      applianceType,
      gadgetBrand,
      model,
      purchaseDate,
      warrantyPeriod,
      agencyOrCompany,
    };

    setApplianceDetails([newApplianceDetails]);
    setApplianceType("");
    setGadgetBrand("");
    setModel("");
    setPurchaseDate("");
    setWarrantyPeriod("");
    setAgencyOrCompany("");
  };
  const homeAppliances = [
    "Refrigerator",
    "Washing Machine",
    "Microwave Oven",
    "Dishwasher",
    "Coffee Maker",
    "Toaster",
    "Blender",
    "Food Processor",
    "Juicer",
    "Oven",
    "Air Conditioner",
    "Water Heater",
    "Vacuum Cleaner",
    "Iron",
    "Hair Dryer",
    "Television",
    "Home Theater System",
    "Soundbar",
    "Fan",
    "Air Purifier",
    "Humidifier",
    "Robot Vacuum",
    "Smart Thermostat",
    "Smart Lighting System",
    "Smart Security Cameras",
    "Smart Doorbell",
    "Smart Lock",
    "Smart Refrigerator",
    "Smart Washer and Dryer",
    "Smart Sprinkler System",
    // Add more appliances as needed
  ];

  const handleDeleteClick = (index) => {
    // Filter out the details for the selected index
    const updatedDetails = applianceDetails.filter((_, i) => i !== index);
    setApplianceDetails(updatedDetails);
  };

  return (
    <div>
      <h6 className="labels">Home Appliance Details</h6>

      <div className="row dmo_occupation pb-2">
        <div className="col-12 col-md-2 pb-2">
          <label htmlFor="applianceType" className="pb-2">
            Select Appliance Type:
          </label>
          <select
            value={selectedAppliance}
            onChange={handleApplianceChange}
            className="form-control"
          >
            <option value="">Select an Appliance</option>
            {homeAppliances.map((appliance, index) => (
              <option key={index} value={appliance}>
                {appliance}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-2 pb-2">
          <label htmlFor="gadgetBrand" className="pb-2">
            Brand:
          </label>
          <input
            className="form-control"
            type="text"
            id="gadgetBrand"
            value={gadgetBrand}
            onChange={handleGadgetBrandChange}
          />
        </div>
        <div className="col-12 col-md-1 pb-2">
          <label htmlFor="model" className="pb-2">
            Model:
          </label>
          <input
            className="form-control"
            type="text"
            id="model"
            value={model}
            onChange={handleModelChange}
          />
        </div>
        <div className="col-12 col-md-2 pb-2">
          <label htmlFor="purchaseDate" className="pb-2">
            Date of Purchase:
          </label>
          <input
            className="form-control"
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={handlePurchaseDateChange}
          />
        </div>
        <div className="col-12 col-md-2 pb-2">
          <label htmlFor="warrantyPeriod" className="pb-2">
            Warranty Period:
          </label>
          <input
            className="form-control"
            type="date"
            id="warrantyPeriod"
            value={warrantyPeriod}
            onChange={handleWarrantyPeriodChange}
          />
        </div>
        <div className="col-12 col-md-2 pb-2">
          <label htmlFor="agencyOrCompany" className="pb-2">
            Agency or Company:
          </label>
          <input
            className="form-control"
            type="text"
            id="agencyOrCompany"
            value={agencyOrCompany}
            onChange={handleAgencyOrCompanyChange}
          />
        </div>
        <div className="col-12 col-md-1 align-self-end pb-2">
          <button
            className="btn btn-primary profile-button dmo_salebtn"
            type="button"
            onClick={handleAddDetails}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      {applianceDetails.length > 0 && (
        <div className="col-12">
          <h2 className="labels">Added Home Appliance Details</h2>
          {applianceDetails.map((data, index) => (
            <div className="row" key={index}>
              <p className="col-12 col-md-2">
                Appliance Type: {data.applianceType}
              </p>
              <p className="col-12 col-md-2">Brand: {data.gadgetBrand}</p>
              <p className="col-12 col-md-2">Model: {data.model}</p>
              <p className="col-12 col-md-2">
                Purchase Date: {data.purchaseDate}
              </p>
              <p className="col-12 col-md-2">
                Warranty Period: {data.warrantyPeriod}
              </p>
              <p className="col-12 col-md-2">
                Agency or Company: {data.agencyOrCompany}
              </p>
              <div className="col-12 col-md-1">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeApplianceSaleForm;
