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
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon from Material-UI icons
import { style } from '../../Styles/Jobformstyle'



const VehicleDetailsFormPage = () => {


    const authdata = useSelector((state) => state.auth.user?.user.user);
    const [Vehicle, setVehicle] = React.useState(false);
    const handleVehicleOpen = () => setVehicle(true);
    const handleVehicleClose = () => setVehicle(false);

    const {
        VehicleDetailsForm, setVehicleDetailsForm,
     VehicleUpdateButton, setVehicleUpdateButton,
     VehicleDetails, setVehicleDetails,
      } = Jobusestates();

    const handleaddVehicleDetails = (e) =>{
        e.preventDefault()
        setVehicleUpdateButton('Add');
        setVehicleDetailsForm('');
      }

      useEffect(() => {
        const fetchVehicleDetails = async() => {
          const fetchVehicleDetails = await axios.post(`${Nodeapi}/FetchLoopDetails`,{
            "id":authdata?.id,
              "table":"VehicleDetails"
        });
             if(fetchVehicleDetails){
              setVehicleDetails(fetchVehicleDetails.data.data.response);
             }
            
        }
    
        fetchVehicleDetails();
      }, []);


    

      const HandleVehicleDetails = async (e) => {
        e.preventDefault();
      
        const action = e.nativeEvent.submitter.value;
      
        if (action.trim() === 'update') {
          const json_data = {
            formdata: VehicleDetailsForm,
            table: 'VehicleDetails',
            id:VehicleDetailsForm.id,
            userid:VehicleDetailsForm.userid,
            message:"Vehicle Detail Updated Successfully...!"
          };
      
          try {
            const updateDetailsResult = await axios.post(`${Nodeapi}/updateHAD`,json_data);
            if (updateDetailsResult) {
              setVehicle(false);
              setVehicleDetails(updateDetailsResult.data.data.response);
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
            insertdata: VehicleDetailsForm,
            table: 'VehicleDetails',
            insertMessage: 'Vehicle Details Inserted Successfully',
          };
         
          try {
            const addDetailsResult = await AddDetails(json_data);
      
            if (addDetailsResult) {
              setVehicle(false);
              setVehicleDetails(addDetailsResult.data.data.response);
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
      const toast = useRef(null);
      const handleVehicleDetails = (e) => {
        const { name, value } = e.target;
        setVehicleDetailsForm({
          ...VehicleDetailsForm,
          [name]: value,
          userid: authdata?.id,
        });
      };

      const Vehiclecolumns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
          field: 'model',
          headerName: 'Model',
          width:170
        },
        {
          field: 'type',
          headerName: 'Type',
          width:150
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
          width:180
          
        },
        {
          field: 'vehicle_no',
          headerName: 'Vehicle NO',
          width:200
          
        },
        {
          field: 'dealer_agency',
          headerName: 'Dealer/Agency',
          width:200
          
        },
        {
          field: 'description',
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
                onClick={(e)=>{handleVehicleOpen();edit_Vehicledetails(e,params)}}
              />
            </strong>
          ),
        },,
      ];
      const edit_Vehicledetails = async (e, data_params) => {
        e.preventDefault();
        setVehicleUpdateButton('Update');
        setVehicleDetailsForm(data_params.row);
      };
  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Vehicle Details</h5>
          <p>
            <Button onClick={(e)=>{handleVehicleOpen();handleaddVehicleDetails(e)}}>
            <i className="fi fi-rr-layer-plus"></i>
            </Button>
            <Modal
              open={Vehicle}
             
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={HandleVehicleDetails}>
                <div className="row">
                <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="vehicleNumber">
                      Vehicle :
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="vehicle"
                      name="vehicle"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.vehicle}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="vehicleNumber">
                      Vehicle Number:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="vehicle_no"
                      name="vehicle_no"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.vehicle_no}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="brand">
                      Brand:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="brand"
                      name="brand"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.brand}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="model">
                      Model:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="model"
                      name="model"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.model}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="model">
                      Agency:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="dealer_agency"
                      name="dealer_agency"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.dealer_agency}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="model">
                      Type:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="type"
                      name="type"
                      onChange={handleVehicleDetails}
                      value={VehicleDetailsForm?.type}
                    />
                  </div>
                  <div className="col-12 my-2">
                   <label htmlFor="agencyOrCompany" className="pb-2">
                     Description
                   </label>
                   <textarea
                     className="form-control"
                     type="text"
                     id="description"
                     name="description"
                     onChange={handleVehicleDetails}
                     value={VehicleDetailsForm?.description}
                     
                   />
                 </div>
                </div>
                <div className="text-center mt-2">
                  <button
                  type="button"
                    className="btn btn-danger me-2"
                    onClick={handleVehicleClose}
                  >
                    Cancel
                  </button>
                  {
                    VehicleUpdateButton == 'Add' ? (
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
          VehicleDetails && (
            <DataGrid
        rows={VehicleDetails}
        columns={Vehiclecolumns}
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

export default VehicleDetailsFormPage
