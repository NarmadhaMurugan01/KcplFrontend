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
import { style } from '../../Styles/Jobformstyle'


const GadgetDetailsFormPage = () => {
  const authdata = useSelector((state) => state.auth.user?.user.user);
  const token = useSelector((state) => state.auth.user?.user.token);

  const toast = useRef(null);

  const [Gadget, setGadget] = React.useState(false);
  const handleGadgetOpen = () => setGadget(true);
  const handleGadgetClose = () => setGadget(false);

  const handleGadgetDetails = (e) => {
    const { name, value } = e.target;
    setGadgetDetailsForm({
      ...GadgetDetailsForm,
      [name]: value,
      userid: authdata?.id,
    });
  };
  const {
    GadgetDetailsForm,
    setGadgetDetailsForm,
    GadgetDetailsdata,
    setGadgetDetailsData,
    GadgetUpdateButton,
    setGadgetUpdateButton,
  } = Jobusestates();


  useEffect(() => {
    const fetchGadgetDetails = async() => {
        const GadgetDetails_datarows = await axios.post(`${Nodeapi}/FetchLoopDetails`,{
            "id":authdata?.id,
            "table":"GadgetDetails"
        });
        
         if(GadgetDetails_datarows){
            setGadgetDetailsData(GadgetDetails_datarows.data.data.response);
         }
        
    }

    fetchGadgetDetails();
  }, []);

  const handleaddGadgetDetails = (e) => {
    e.preventDefault();
    setGadgetUpdateButton("Add");
    setGadgetDetailsForm("");
  };
  const edit_Gadgetdetails = async (e, data_params) => {
    e.preventDefault();
    setGadgetUpdateButton("Update");
    setGadgetDetailsForm(data_params.row);
  };
  const Gadgetscolumns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "gadget",
      headerName: "Gadget",
      width: 170,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "warranty",
      headerName: "Warranty",
      width: 150,
    },
    {
      field: "purchase_date",
      headerName: "Purchase Date",
      width: 150,
    },

    {
      field: "description",
      headerName: "Description",
      width: 120,
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
              handleGadgetOpen();
              edit_Gadgetdetails(e, params);
            }}
          />
        </strong>
      ),
    },
    ,
  ];

  

  const handleGadgets = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;

    if (action.trim() === "update") {
      const json_data = {
        formdata: GadgetDetailsForm,
        table: "GadgetDetails",
        id: GadgetDetailsForm.id,
        userid: GadgetDetailsForm.userid,
        message: "Gadget Details Updated Successfully...!",
      };

      try {
        const updateDetailsResult = await axios.post(
          `${Nodeapi}/updateHAD`,
          json_data
        );

        if (updateDetailsResult) {
          setGadget(false);
          setGadgetDetailsData(updateDetailsResult.data.data.response);
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
        insertdata: GadgetDetailsForm,
        table: "GadgetDetails",
        insertMessage: "Gadget Details Inserted Successfully",
      };

      try {
        const addDetailsResult = await AddDetails(json_data,token);
        console.log('addDetailsResult',addDetailsResult);
        if (addDetailsResult) {
          setGadget(false);
          setGadgetDetailsData(addDetailsResult.data.data.response);
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
  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Gadget Details</h5>
          <p>
            <Button
              onClick={(e) => {
                handleGadgetOpen();
                handleaddGadgetDetails(e);
              }}
            >
              <i className="fi fi-rr-layer-plus"></i>
            </Button>
            <Modal
              open={Gadget}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleGadgets}>
                  <div className="row">
                    <div className="col-6 my-2">
                      <label htmlFor="gadgetBrand" className="pb-2">
                        Gadget Type
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="gadget"
                        name="gadget"
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.gadget}
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
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.brand}
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
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.model}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="warranty" className="pb-2">
                        Purchase Date:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        id="purchase_date"
                        name="purchase_date"
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.purchase_date}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="warranty" className="pb-2">
                        Warranty:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="warranty"
                        name="warranty"
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.warranty}
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
                        onChange={handleGadgetDetails}
                        value={GadgetDetailsForm?.description}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleGadgetClose}
                    >
                      Cancel
                    </button>
                    {GadgetUpdateButton == "Add" ? (
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
          GadgetDetailsdata && (
            <DataGrid
            rows={GadgetDetailsdata}
            columns={Gadgetscolumns}
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

export default GadgetDetailsFormPage;
