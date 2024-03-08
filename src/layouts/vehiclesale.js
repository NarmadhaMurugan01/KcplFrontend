import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const VehicleSaleForm = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [model, setModel] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [agencyOrCompany, setAgencyOrCompany] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
    setVehicleType(e.target.value);
  };

  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    // You can perform further actions based on the selected brand
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handlePurchaseDateChange = (event) => {
    const inputDate = event.target.value;
    // Simple date validation (you might want to improve it)
    if (inputDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setPurchaseDate(inputDate);
    } else {
      // Handle invalid date
      // You can show an error message or perform other actions
      console.error("Invalid date format");
    }
  };

  const handleWarrantyPeriodChange = (event) => {
    const inputDate = event.target.value;
    // Simple date validation (you might want to improve it)
    if (inputDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setWarrantyPeriod(inputDate);
    } else {
      // Handle invalid date
      // You can show an error message or perform other actions
      console.error("Invalid date format");
    }
  };

  const handleDeleteClick = (index) => {
    // Filter out the details for the selected vehicle type
    const updatedDetails = vehicleDetails.filter((_, i) => i !== index);
    setVehicleDetails(updatedDetails);
  };

  const handleAgencyOrCompanyChange = (event) => {
    setAgencyOrCompany(event.target.value);
  };

  const handleAddDetails = () => {
    // Check if details for the selected vehicle type already exist
    const existingDetailsIndex = vehicleDetails.findIndex(
      (details) => details.vehicleType === selectedVehicle
    );

    if (existingDetailsIndex !== -1) {
      // If details exist, update the existing entry
      const updatedDetails = [...vehicleDetails];
      updatedDetails[existingDetailsIndex] = {
        vehicleType: selectedVehicle,
        vehicleNumber,
        brand,
        model,
        purchaseDate,
        warrantyPeriod,
        agencyOrCompany,
      };
      setVehicleDetails(updatedDetails);
    } else {
      // If details don't exist, add a new entry
      const newVehicleDetails = {
        vehicleType: selectedVehicle,
        vehicleNumber,
        brand,
        model,
        purchaseDate,
        warrantyPeriod,
        agencyOrCompany,
      };
      setVehicleDetails([...vehicleDetails, newVehicleDetails]);
    }

    // Clear the form fields after adding
    setVehicleNumber("");
    setBrand("");
    setModel("");
    setPurchaseDate("");
    setWarrantyPeriod("");
    setAgencyOrCompany("");
  };

  const vehicleTypes = [
    "Car",
    "Truck",
    "Motorcycle",
    "SUV",
    "Van",
    "Bus",
    "Bicycle",
    "Electric Scooter",
    "Motorized Skateboard",
    "Boat",
    "Jet Ski",
    "RV",
    "ATV",
    "Snowmobile",
    "Ambulance",
    "Fire Truck",
    "Police Car",
    "Taxi",
    "Bulldozer",
    "Forklift",
    "Tractor",
    "Ambulance",
    "Motorhome",
  ];

  const carBrands = {
    international: [
      "Audi",
      "BMW",
      "Mercedes-Benz",
      "Volkswagen",
      "Ford",
      "Chevrolet",
      "Toyota",
      "Honda",
      "Nissan",
      "Hyundai",
      "Kia",
      "Volvo",
      "Mazda",
      "Subaru",
      "Tesla",
      "Ferrari",
      "Lamborghini",
      "Porsche",
      "Maserati",
      "Jaguar",
      "Land Rover",
      "Jeep",
      "Dodge",
      "Chrysler",
      "Buick",
      "Cadillac",
      "GMC",
      "Acura",
      "Lexus",
      "Infiniti",
      "Mitsubishi",
      "Lincoln",
      "Alfa Romeo",
      "MINI",
      "Fiat",
      "Bentley",
      "Rolls-Royce",
      "McLaren",
    ],
    indian: [
      "Maruti Suzuki",
      "Hyundai",
      "Tata Motors",
      "Kia",
      "Mahindra & Mahindra",
      "Honda",
      "Toyota",
      "Volkswagen",
      "Ford",
      "Renault",
      "Skoda",
      "Nissan",
      "MG Motor",
      "Audi",
      "BMW",
      "Mercedes-Benz",
      "Ford",
      "Jeep",
      "Skoda",
      "Toyota",
      "ISUZU",
      "Jaguar",
      "Volvo",
      "Lexus",
      "Land Rover",
      "Porsche",
      "Ferrari",
      "Rolls Royer",
      "Bentley",
      "Bugatti",
      "Force Motors",
      "Mitsubishi",
      "Bajaj Qute",
      "Citroen",
      "Lamborghini",
      "MINI",
      "Aston Martin",
      "Maserati",
      "MC Laren",
      "Pravaig models",
      "Haval",
    ],
  };
  return (
    <div>
      <div className="row my-4">
        <div className="labels col-12 col-md-2 px-3">Vehicle Details</div>
      </div>

      <div className="row dmo_occupation">
        <form className="row my-4">
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="vehicleType">Vehicle type:</label>
            <div>
              <select
                className="form-select"
                id="vehicleType"
                value={selectedVehicle}
                onChange={handleVehicleChange}
              >
                <option value="">Select Vehicle</option>
                {vehicleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="vehicleNumber">Vehicle Number:</label>
            <input
              className="form-control"
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="brand">Brand:</label>
            <select
              className="form-select"
              id="carBrands"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              <option value="" disabled>
                Select a brand
              </option>
              <optgroup label="International Brands">
                {carBrands.international.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Indian Brands">
                {carBrands.indian.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="model">Model:</label>
            <input
              className="form-control"
              type="text"
              id="model"
              value={model}
              onChange={handleModelChange}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="purchaseDate">Date of Purchase:</label>
            <input
              className="form-control"
              type="date"
              id="purchaseDate"
              value={purchaseDate}
              onChange={handlePurchaseDateChange}
            />
          </div>
          <div className="col-12 col-md-2 pb-2">
            <label htmlFor="warrantyPeriod">Warranty Period:</label>
            <input
              className="form-control"
              type="date"
              id="warrantyPeriod"
              value={warrantyPeriod}
              onChange={handleWarrantyPeriodChange}
            />
          </div>
          <div className="col-12 col-md-2">
            <label htmlFor="agencyOrCompany">Agency or Company:</label>
            <input
              className="form-control"
              type="text"
              id="agencyOrCompany"
              value={agencyOrCompany}
              onChange={handleAgencyOrCompanyChange}
            />
          </div>
          <div className="col-12 col-md-2 align-self-end">
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

      {vehicleDetails.length > 0 && (
        <div className="col-12">
          <h2 className="labels">Added Vehicle Details</h2>
          {vehicleDetails.map((data, index) => (
            <div className="row" key={index}>
              <p className="col-12 col-md-2">
                Vehicle Type: {data.vehicleType}
              </p>
              <p className="col-12 col-md-2">
                Vehicle Number: {data.vehicleNumber}
              </p>
              <p className="col-12 col-md-2">Brand: {data.brand}</p>
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
              <div className="col-12 col-md-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleDeleteClick(index)}
                >
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

export default VehicleSaleForm;
