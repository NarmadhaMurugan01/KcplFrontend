// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// const DisabilityForm1 = () => {
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [selectedDisabilityReasons, setSelectedDisabilityReasons] = useState([]);
//   const [displayedDisabilityInfo, setDisplayedDisabilityInfo] = useState(null);

//   const allDisabilityReasons = [
//     'Mobility impairment',
//     'Visual impairment',
//     'Hearing impairment',
//     'Cognitive or learning disability',
//     'Chronic illness',
//     'Other',
//   ];

//   const handleIsDisabledChange = (e) => {
//     setIsDisabled(e.target.value === 'yes');
//     setSelectedDisabilityReasons([]);
//   };

//   const handleAddReasonClick = () => {
//     const selectedReason = document.getElementById("disabilityReason").value;

//     if (selectedReason && !selectedDisabilityReasons.includes(selectedReason)) {
//       setSelectedDisabilityReasons((prevReasons) => [...prevReasons, selectedReason]);
//       document.getElementById("disabilityReason").value = ""; // Clear the selected value
//     }
//   };

//   const handleDisplayClick = () => {
//     if (isDisabled && selectedDisabilityReasons.length > 0) {
//       const newDisabilityInfo = {
//         isDisabled: true,
//         disabilityReasons: selectedDisabilityReasons,
//       };
//       setDisplayedDisabilityInfo(newDisabilityInfo);
//     } else {
//       setDisplayedDisabilityInfo(null);
//     }
//   };

//   return (
//     <div className='my-4'>
//       <h2 className='labels'>Disability Details</h2>
//       <div className="row my-3">
//         <div className="col-12 col-md-3 pb-2">
//           <label className="form-label">Are you a person with a disability?</label>
//           <select
//             className="form-select"
//             value={isDisabled ? 'yes' : 'no'}
//             onChange={handleIsDisabledChange}
//           >
//             <option value="no">No</option>
//             <option value="yes">Yes</option>
//           </select>
//         </div>
//         {isDisabled && (
//           <div className="col-12 col-md-4 pb-2">
//             <label className="form-label dmo_diswidth">Disability Reasons</label>
//             <div className="d-flex">
//               <select
//                 id="disabilityReason"
//                 className="form-select mr-2"
//                 onChange={(e) => handleAddReasonClick(e.target.value)}
//               >
//                 <option value="">Select Disability Reason</option>
//                 {allDisabilityReasons.map((reason, index) => (
//                   <option key={index} value={reason}>
//                     {reason}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleAddReasonClick}
//               >
//                 <FontAwesomeIcon icon={faPlus} />
//               </button>
//             </div>
//           </div>
//         )}

//         <div className='col-12 col-md-4 dmo_disabilitybtn'>
//           <button className="btn btn-outline-primary width-fit-content" onClick={handleDisplayClick}>
//             Disability Information
//           </button>
//         </div>
//       </div>

//       {displayedDisabilityInfo && (
//         <div className='row px-3'>
//           <h3 className='labels col-12 '>Disability Information:</h3>
//           <p className='col-12 col-md-6 p-0'>
//             Person with a disability: Yes
//           </p>
//           <p className='col-12 col-md-2'>Disability Reasons: {displayedDisabilityInfo.disabilityReasons.join(', ')}</p>
//           <hr />
//         </div>
//       )}
//     </div>

  
  
// )};

// export default DisabilityForm1;


import React, { useState } from 'react';

const DisabilityForm1 = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedDisabilityReasons, setSelectedDisabilityReasons] = useState([]);
  const [displayedDisabilityInfo, setDisplayedDisabilityInfo] = useState(null);

  const allDisabilityReasons = [
    'Mobility impairment',
    'Visual impairment',
    'Hearing impairment',
    'Cognitive or learning disability',
    'Chronic illness',
    'Other',
  ];

  const handleIsDisabledChange = (e) => {
    setIsDisabled(e.target.value === 'yes');
    setSelectedDisabilityReasons([]);
    setDisplayedDisabilityInfo(null); // Reset displayed info when changing the 'isDisabled' status
  };

  const handleAddReasonClick = () => {
    const selectedReason = document.getElementById("disabilityReason").value;

    if (selectedReason && !selectedDisabilityReasons.includes(selectedReason)) {
      setSelectedDisabilityReasons((prevReasons) => [...prevReasons, selectedReason]);
      document.getElementById("disabilityReason").value = ""; // Clear the selected value
      setDisplayedDisabilityInfo(null); // Reset displayed info when adding a new reason
    }
  };

  const handleDisplayClick = () => {
    if (isDisabled && selectedDisabilityReasons.length > 0) {
      const newDisabilityInfo = {
        isDisabled: true,
        disabilityReasons: selectedDisabilityReasons,
      };
      setDisplayedDisabilityInfo(newDisabilityInfo);
    } else {
      setDisplayedDisabilityInfo(null);
    }
  };

  const handleDeleteClick = () => {
    setDisplayedDisabilityInfo(null);
    setSelectedDisabilityReasons([]);
    setIsDisabled(false); // Reset isDisabled state as well if needed
  };
  
  
  

  return (
    <div className='my-4'>
      <h2 className='labels'>Disability Details</h2>
      <div className="row my-3">
        <div className="col-12 col-md-3 pb-2">
          <label className="form-label">Are you a person with a disability?</label>
          <select
            className="form-select"
            value={isDisabled ? 'yes' : 'no'}
            onChange={handleIsDisabledChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        {isDisabled && (
          <div className="col-12 col-md-4 pb-2">
            <label className="form-label dmo_diswidth">Disability Reasons</label>
            <div className="d-flex">
              <select
                id="disabilityReason"
                className="form-select mr-2"
                onChange={handleAddReasonClick} // Use onChange directly
              >
                <option value="">Select Disability Reason</option>
                {allDisabilityReasons.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className='col-12 col-md-4 dmo_disabilitybtn'>
          <button className="btn btn-outline-primary width-fit-content" onClick={handleDisplayClick}>
            Disability Information
          </button>
        
        </div>
      </div>

      {displayedDisabilityInfo && (
        <div className='row px-3'>
          <h3 className='labels col-12 '>Disability Information:</h3>
          <p className='col-12 col-md-6 p-0'>
            Person with a disability: Yes
          </p>
          <p className='col-12 col-md-2'>Disability Reasons: </p>
          <p className="col-12 col-md-2">{displayedDisabilityInfo.disabilityReasons.join(', ')}</p>
          {displayedDisabilityInfo && (
            <div className='col-12 col-md-2'>
            <button type="button" className="btn btn-outline-primary" onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
          
          <hr />
        </div>
        
      )}
    </div>
  );
};

export default DisabilityForm1;

