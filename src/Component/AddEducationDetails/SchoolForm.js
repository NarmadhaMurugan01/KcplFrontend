import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
import {
  allDegrees,
  Specializations,
  allUniversities,
  schoolQualificationList,
  academicDisciplines,
} from "../../Data/JobJson";
import { style } from "../../Styles/Jobformstyle";
import axios from "axios";
import { Nodeapi } from "../../config/serverUrl";


function SchoolForm() {
  const [tableData, setTableData] = useState([
    // Initial table data
    {
      id: 1,
      scl_qualification: "",
      scl_specialization: "",
      scl_start: "",
      scl_end: "",
      scl_name: "",
      scl_percentage: "",
    },
  ]);

    console.log('school details',tableData);


  const handleAddInputField = () => {
    // Add a new row with empty input fields
    setTableData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, scl_qualification: "",
      scl_specialization: "",
      scl_start: "",
      scl_end: "",
      scl_name: "",
      scl_percentage: "", },
    ]);
  };

  const handleRemoveRow = (index) => {
    // Remove the row at the specified index
    setTableData((prevData) => prevData.filter((row, i) => i !== index));
  };

  const handleInputChange = (index, fieldName, value) => {
    // Update the value of the input field in the specified row
    setTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [fieldName]: value } : row
      )
    );
  };


  const handleSchool = async() => {
    try {
      const res = axios.post(`${Nodeapi}/`)
    } catch (error) {
      
    }
  }

  return (
    <div style={{
      marginTop:"20px"
    }}>
      <table>
        <thead style={{
          border:"1 px solid black"
        }}>
          <tr>
            <th>Id</th>
            <th>Qualification</th>
            <th>Specialization</th>
            <th>Start Year</th>
            <th>End Year</th>
            <th>Enter School Name</th>
            <th>Enter School Percentage</th>
            <th>
              <AddCircleIcon
                onClick={handleAddInputField}
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            </th>{" "}
            {/* Add Action column */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <select
                  className="form-select"
                  name="scl_qualification"
                  id="scl_qualification"
                  onChange={(e) =>
                    handleInputChange(index, "scl_qualification", e.target.value)
                  }
                >
                  <option value="">Select School Qualification</option>
                  {schoolQualificationList.map((qualification, index) => (
                    <option key={index} value={qualification}>
                      {qualification}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  name="scl_specialization"
                  id="scl_specialization"
                  onChange={(e) =>
                    handleInputChange(index, "scl_specialization", e.target.value)
                  }
                >
                  <option value="">Select Specialization</option>
                  {academicDisciplines.map((discipline, index) => (
                    <option key={index} value={discipline}>
                      {discipline}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Start Year"
                  name="scl_start"
                  id="scl_start"
                  onChange={(e) =>
                    handleInputChange(index, "scl_start", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter End Year"
                  name="scl_end"
                  id="scl_end"
                  onChange={(e) =>
                    handleInputChange(index, "scl_end", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="scl_name"
                  id="scl_name"
                  onChange={(e) =>
                    handleInputChange(index, "scl_name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="scl_percentage"
                  id="scl_percentage"
                  onChange={(e) =>
                    handleInputChange(index, "scl_percentage", e.target.value)
                  }
                />
              </td>
              <td>
                <CancelIcon
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleRemoveRow(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchoolForm;
