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



const HomeApplianceFormPage = () => {
  const [Home, setHome] = React.useState(false);
  const handleHomeOpen = () => setHome(true);
  const handleHomeClose = () => setHome(false);

  const authdata = useSelector((state) => state.auth.user?.user.user);
  const toast = useRef(null);

  const {
    HomeApllianceDetailsForm,
    setHomeApllianceDetailsForm,
    HomeApplianceDetails,
    setHomeApplianceDetails,
    UpdateButton,
    setUpdateButton,
  } = Jobusestates();

  const handleaddHomeDetails = (e) => {
    e.preventDefault();
    setUpdateButton("Add");
    setHomeApllianceDetailsForm("");
  };

  useEffect(() => {
    const fetchHomeAppliance = async() => {
        const fetchHomeDetails = await axios.post(`${Nodeapi}/FetchLoopDetails`,{
            "id":authdata?.id,
            "table":"HomeApplianceDetails"
        });
         if(fetchHomeDetails){
            setHomeApplianceDetails(fetchHomeDetails.data.data.response);
         }
        
    }

    fetchHomeAppliance();
  }, []);
  

  const edit_Homedetails = async (e, data_params) => {
    e.preventDefault();
    setUpdateButton('Update');
    setHomeApllianceDetailsForm(data_params.row);
  };

  const handleHomeApplianceDetails = (e) => {
    const { name, value } = e.target;
    setHomeApllianceDetailsForm({
      ...HomeApllianceDetailsForm,
      [name]: value,
      userid: authdata?.id,
    });
  };
  console.log(HomeApllianceDetailsForm);
  

  const HandleHomeApplianceDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;

    if (action.trim() === "update") {
      const json_data = {
        formdata: HomeApllianceDetailsForm,
        table: "HomeApplianceDetails",
        id: HomeApllianceDetailsForm.id,
        userid: HomeApllianceDetailsForm.userid,
        message: "Home Appliance Updated Successfully...!",
      };

      try {
        const updateDetailsResult = await axios.post(
          `${Nodeapi}/updateHAD`,
          json_data
        );

        if (updateDetailsResult) {
          setHome(false);
          setHomeApplianceDetails(updateDetailsResult.data.data.response);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: updateDetailsResult.data.data.message,
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: updateDetailsResult.data.data.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating details:", error);
      }
    } else {
      const json_data = {
        insertdata: HomeApllianceDetailsForm,
        table: "HomeApplianceDetails",
        insertMessage: "Home ApplianceDetails Details Inserted Successfully",
      };

      try {
        const addDetailsResult = await AddDetails(json_data);

        if (addDetailsResult) {
          setHome(false);

          setHomeApplianceDetails(addDetailsResult.data.data.response);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: addDetailsResult.data.data.message,
            life: 3000,
          });
        } else {
          console.log(addDetailsResult);
        }
      } catch (error) {
        console.error("Error adding details:", error);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "Appliance_type",
      headerName: "Appliance Type",
      width: 170,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
    },
    {
      field: "date_of_purchase",
      headerName: "Date Of Purchase",
      width: 150,
    },
    {
      field: "start_period",
      headerName: "Warranty Start Period",
      width: 120,
    },
    {
      field: "end_period",
      headerName: "Warranty End Period",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              handleHomeOpen();
              edit_Homedetails(e, params);
            }}
          />
        </strong>
      ),
    },
    ,
  ];

  return (
    <div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Home Appliance Details</h5>
          <p>
            <Button
              onClick={(e) => {
                handleHomeOpen();
                handleaddHomeDetails(e);
              }}
            >
              <i className="fi fi-rr-layer-plus"></i>
            </Button>
            <Modal
              open={Home}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={HandleHomeApplianceDetails}>
                  <div className="row">
                    <div className="col-6 my-2">
                      <label htmlFor="gadgetBrand" className="pb-2">
                        Appliance Type:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="Appliance_type"
                        name="Appliance_type"
                        value={HomeApllianceDetailsForm?.Appliance_type}
                        onChange={handleHomeApplianceDetails}
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label htmlFor="gadgetBrand" className="pb-2">
                        Brand:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="brand"
                        name="brand"
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.brand}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="model" className="pb-2">
                        Model:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="model"
                        name="model"
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.model}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="purchaseDate" className="pb-2">
                        Date of Purchase:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        id="date_of_purchase"
                        name="date_of_purchase"
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.date_of_purchase}
                      />
                    </div>
                    <label> Warranty Period:</label>
                    <div className="col-6 my-2">
                      <label htmlFor="warrantyPeriod" className="pb-2">
                        Start Period:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        id="start_period"
                        name="start_period"
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.start_period}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="warrantyPeriod" className="pb-2">
                        End Period:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        id="end_period"
                        name="end_period"
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.end_period}
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
                        onChange={handleHomeApplianceDetails}
                        value={HomeApllianceDetailsForm?.description}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleHomeClose}
                    >
                      Cancel
                    </button>

                    {UpdateButton == "Add" ? (
                      <button
                        type="submit"
                        value="add"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        value="update"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </Box>
            </Modal>
          </p>
        </div>

        <Box sx={{ height: "auto" }}>
        {
          HomeApplianceDetails && (
            <DataGrid
            rows={HomeApplianceDetails}
            columns={columns}
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
  );
};

export default HomeApplianceFormPage;
