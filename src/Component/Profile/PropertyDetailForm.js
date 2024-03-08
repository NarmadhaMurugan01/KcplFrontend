import React, { useState } from "react";
import { useEffect } from "react";
import {
  UpdateDetails,
  AddDetails,
  FetchDetails,
} from "../../routes/profileRoutes";
import Jobusestates from "../../useStates/JobUsestate";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";
import { Nodeapi } from "../../config/serverUrl";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
const PropertyDetailFormPage = () => {

    const authdata = useSelector((state) => state.auth.user?.user.user);
    const toast = useRef(null);

    useEffect(() => {
        const fetchPropertyDetails = async() => {
            const PropertyDetails = await axios.post(`${Nodeapi}/FetchLoopDetails`,{
                "id":authdata?.id,
                "table":"PropertyDetails"
            });
            
             if(PropertyDetails){
                setPropertyDetails(PropertyDetails.data.data.response);
             }
            
        }
    
        fetchPropertyDetails();
      }, []);


    const Propertyscolumns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
          field: 'bhk_type',
          headerName: 'Type',
          width:170
        },
        {
          field: 'property_status',
          headerName: 'Availability',
          width:150
        },
        {
          field: 'property_types',
          headerName: 'House Types',
          width:150
          
        },
        {
          field: 'land_sqfit',
          headerName: 'Land Sq.ft',
          width:150
          
        },
       
        {
          field: 'property_location',
          headerName: 'Location',
          width:120
          
        },
        {
          field: 'property_description',
          headerName: 'Description',
          width:120
          
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width:150,
          sortable: false,
          renderCell: (params) => (
            
            <strong>
              <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(e)=>{handlePropertyOpen();edit_propertydetails(e,params)}}
              />
            </strong>
          ),
        },,
      ];

      const [Property, setProperty] = React.useState(false);
      const handlePropertyOpen = () => setProperty(true);
      const handlePropertyClose = () => setProperty(false);
      const [propertyTypes, setPropertyTypes] = useState([]);
      const [commercialType, setCommercialType] = useState("");
      const [residentialType, setResidentialType] = useState("");
      const [bhkType, setBhkType] = useState("");
      const [furnishingOptions, setFurnishingOptions] = useState([]);
      const [saleDate, setSaleDate] = useState("");
      const [sellerName, setSellerName] = useState("");
      const [propertyLocation, setPropertyLocation] = useState("");
      const [saleAmount, setSaleAmount] = useState("");
      const [saleDetails, setSaleDetails] = useState([]);
      const [agriculturalType, setAgriculturalType] = useState("");
      const [industrialType, setIndustrialType] = useState("");
      const [propertyStatus, setPropertyStatus] = useState("");
      const [landSquarefit, setLandSquarefit] = useState("");
      const [propertyDescription, setPropertyDescription] = useState("");

      const {
        PropertyUpdateButton, setPropertyUpdateButton,
     PropertyDetailsForm, setPropertyDetailsForm,
     PropertyDetails, setPropertyDetails,
      } = Jobusestates();

      const edit_propertydetails = async (e, data_params) => {
  
        e.preventDefault();
        setPropertyUpdateButton('Update');
        setPropertyDetailsForm(data_params.row);
      };

      const handleaddpropertyDetails = (e) =>{
        e.preventDefault()
        setPropertyUpdateButton('Add');
        setPropertyDetailsForm('');
      }

      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "0px",
        boxShadow: 24,
        borderRadius: "12px",
        p: 4,
      };

      const handleProperty = async (e) => {
        e.preventDefault();
      
        const action = e.nativeEvent.submitter.value;
      
        if (action.trim() === 'update') {
          const json_data = {
            formdata: PropertyDetailsForm,
            table: 'PropertyDetails',
            id:PropertyDetailsForm.id,
            userid:PropertyDetailsForm.userid,
             message:"Property Details Updated Successfully...!"
          };
      
          try {
            const updateDetailsResult = await axios.post(`${Nodeapi}/updateHAD`,json_data);
            
            if (updateDetailsResult) {
              setProperty(false);
              setPropertyDetails(updateDetailsResult.data.data.response);
              toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: updateDetailsResult.data.data.message,
                life: 3000,
              });
            } else {
              toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: updateDetailsResult.data.data.message,
                life: 3000,
              });
            }
          } catch (error) {
            console.error('Error updating details:', error);
          }
        } else {
          const json_data = {
            insertdata: PropertyDetailsForm,
            table: 'PropertyDetails',
            insertMessage: 'Gadget Details Inserted Successfully',
          };
         
          try {
            const addDetailsResult = await AddDetails(json_data);
           
            if (addDetailsResult) {
              setProperty(false);
              setPropertyDetails(addDetailsResult.data.data.response);
              toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: addDetailsResult.data.data.message,
                life: 3000,
              });
            } else {
              console.log(addDetailsResult);
            }
          } catch (error) {
            console.error('Error adding details:', error);
          }
        }
      };

      const handlePropertyDetails = (e) => {
        const { name, value } = e.target;
        setPropertyDetailsForm({
          ...PropertyDetailsForm,
          [name]: value,
          userid: authdata?.id,
          property_types_option:propertyTypes[0]
        });
      };

     


      const handlePropertyTypeChange = (propertyType) => {
        // If the property type is commercial, unselect other types
        if (propertyType === "commercial") {
          setCommercialType("");
          setResidentialType("");
          setBhkType("");
          setAgriculturalType("");
          setIndustrialType("");
        } else if (propertyType === "house") {
          // If the property type is house, unselect other types
          setCommercialType("");
          setAgriculturalType("");
          setIndustrialType("");
        } else if (propertyType === "agricultural") {
          // If the property type is agricultural, unselect other types
          setCommercialType("");
          setResidentialType("");
          setBhkType("");
          setIndustrialType("");
        } else if (propertyType === "industrial") {
          // If the property type is industrial, unselect other types
          setCommercialType("");
          setResidentialType("");
          setBhkType("");
          setAgriculturalType("");
        }
    
        const updatedPropertyTypes = [propertyType];
        setPropertyTypes(updatedPropertyTypes);
      };
  return (
    <div>
       <Toast ref={toast} />
       <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Property Details</h5>
          <p>
            <Button onClick={(e)=>{handlePropertyOpen();handleaddpropertyDetails(e);}}>
            <i className="fi fi-rr-layer-plus"></i>
            </Button>
            <Modal
              open={Property}
              
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <form onSubmit={handleProperty}>
              <div className="row">
                  <h6 className="labels mb-2">Property Details:</h6>
                  {
                    PropertyUpdateButton == 'Add' ? (
                      <div className="col-6 my-2Feduca">
                    <label className="pb-2">Property Types:</label>
                    <div>
                      <input
                        type="checkbox"
                        value="commercial"
                        checked={propertyTypes.includes("commercial")}
                        onChange={() => handlePropertyTypeChange("commercial")}
                      />
                      <label className="px-2">Commercial</label>

                      {propertyTypes.includes("commercial") && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                        >
                          <option value="">Select Commercial Type</option>
                          <option value="hotel">Hotel</option>
                          <option value="officeSpace">Office Space</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="showroom">Showroom</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="house"
                        checked={propertyTypes.includes("house")}
                        onChange={() => handlePropertyTypeChange("house")}
                      />
                      <label className="px-2">Residential</label>
                      {propertyTypes.includes("house") && (
                        <div>
                          <select
                            className="form-control"
                            name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                          >
                            <option value="">Select Residential Type</option>
                            <option value="villa">Villa</option>
                            <option value="independentHouse">
                              Independent House
                            </option>
                            <option value="residentialPlot">
                              Residential Plot
                            </option>
                            <option value="farmHouse">Farm House</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="payingGuest">Paying Guest</option>
                            <option value="rowhouse">Rowhouse</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="agricultural"
                        checked={propertyTypes.includes("agricultural")}
                        onChange={() =>
                          handlePropertyTypeChange("agricultural")
                        }
                      />
                      <label className="px-2">Agricultural</label>
                      {propertyTypes.includes("agricultural") && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                        >
                          <option value="">Select Agricultural Type</option>
                          <option value="farmLand">Farm Land</option>
                          <option value="plantation">Plantation</option>
                          <option value="orchard">Orchard</option>
                          <option value="agriculturalLand">
                            Agricultural Land
                          </option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="industrial"
                        checked={propertyTypes.includes("industrial")}
                        onChange={() => handlePropertyTypeChange("industrial")}
                      />
                      <label className="px-2">Industrial</label>
                      {propertyTypes.includes("industrial") && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                        >
                          <option value="">Select Industrial Type</option>
                          <option value="factory">Factory</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="industrialLand">
                            Industrial Land
                          </option>
                          <option value="manufacturingPlant">
                            Manufacturing Plant
                          </option>
                        </select>
                      )}
                    </div>
                  </div>
                    ) : (
                      <div className="col-6 my-2Feduca">
                    <label className="pb-2">Property Types:</label>
                    <div>
                      <input
                        type="checkbox"
                        value="commercial"
                        checked={propertyTypes.includes("commercial")}
                        onChange={() => handlePropertyTypeChange("commercial")}
                      />
                      <label className="px-2">Commercial</label>

                      {PropertyDetailsForm?.property_types_option == 'commercial' && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                          value={PropertyDetailsForm?.property_types}
                        >
                          <option value="">Select Commercial Type</option>
                          <option value="hotel">Hotel</option>
                          <option value="officeSpace">Office Space</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="showroom">Showroom</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="house"
                        checked={propertyTypes.includes("house")}
                        onChange={() => handlePropertyTypeChange("house")}
                      />
                      <label className="px-2">Residential</label>
                      {propertyTypes.includes("house") || PropertyDetailsForm?.property_types_option == 'house' && (
                        <div>
                          <select
                            className="form-control"
                            name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                          value={PropertyDetailsForm?.property_types}
                          >
                            <option value="">Select Residential Type</option>
                            <option value="villa">Villa</option>
                            <option value="independentHouse">
                              Independent House
                            </option>
                            <option value="residentialPlot">
                              Residential Plot
                            </option>
                            <option value="farmHouse">Farm House</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="payingGuest">Paying Guest</option>
                            <option value="rowhouse">Rowhouse</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="agricultural"
                        checked={propertyTypes.includes("agricultural")}
                        onChange={() =>
                          handlePropertyTypeChange("agricultural")
                        }
                      />
                      <label className="px-2">Agricultural</label>
                      {propertyTypes.includes("agricultural") || PropertyDetailsForm?.property_types_option == 'agricultural' && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                          value={PropertyDetailsForm?.property_types}
                        >
                          <option value="">Select Agricultural Type</option>
                          <option value="farmLand">Farm Land</option>
                          <option value="plantation">Plantation</option>
                          <option value="orchard">Orchard</option>
                          <option value="agriculturalLand">
                            Agricultural Land
                          </option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="industrial"
                        checked={propertyTypes.includes("industrial")}
                        onChange={() => handlePropertyTypeChange("industrial")}
                      />
                      <label className="px-2">Industrial</label>
                      {propertyTypes.includes("industrial") || PropertyDetailsForm?.property_types_option == 'industrial' && (
                        <select
                          className="form-control"
                          name="property_types"
                          id="property_types"
                          onChange={handlePropertyDetails}
                           value={PropertyDetailsForm?.property_types}
                        >
                          <option value="">Select Industrial Type</option>
                          <option value="factory">Factory</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="industrialLand">
                            Industrial Land
                          </option>
                          <option value="manufacturingPlant">
                            Manufacturing Plant
                          </option>
                        </select>
                      )}
                    </div>
                  </div>
                    )
                  }
                  
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">BHK Type:</label>
                    <select
                      onChange={handlePropertyDetails}
                      className="form-control"
                      name="bhk_type"
                      id="bhk_type"
                      value={PropertyDetailsForm?.bhk_type}
                    >
                      <option value="">BHK</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                      <option value="4+bhk">4+ BHK</option>
                    </select>
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Property Description</label>
                    <textarea
                      className="form-control"
                      type="text"
                      id="property_description"
                      name="property_description"
                      onChange={handlePropertyDetails}
                      value={PropertyDetailsForm?.property_description}
                    />
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Property Location:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="property_location"
                      name="property_location"
                      onChange={handlePropertyDetails}
                      value={PropertyDetailsForm?.property_location}
                    />
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">property status</label>
                    <select
                      className="form-control"
                      id="property_status"
                      name="property_status"
                      onChange={handlePropertyDetails}
                      value={PropertyDetailsForm?.property_status}
                    >
                      <option value="">select status</option>
                      <option value="rent">Rent</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Land Squarefit</label>
                    <input
                      className="form-control"
                      type="text"
                      id="land_sqfit"
                      name="land_sqfit"
                      value={PropertyDetailsForm?.land_sqfit}
                      onChange={handlePropertyDetails}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button 
                  type="button" 
                  class="btn btn-danger me-2"
                  onClick={handlePropertyClose}
                  >
                    Cancel
                  </button>
                  {
                    PropertyUpdateButton == 'Add' ? (
                    <button type="submit" value='add'  className="btn btn-primary">Submit</button>
                  ) : (
                    <button type="submit" value='update' className="btn btn-primary">Update</button>
                  )
                 }
                </div>
              </form>

              </Box>
            </Modal>
          </p>
        </div>
        <Box sx={{ height: 'auto',}}>

        {
          PropertyDetails && (
            <DataGrid
        rows={PropertyDetails}
        columns={Propertyscolumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
          )
        }
      
    </Box>
      </div>
    </div>
  )
}

export default PropertyDetailFormPage
