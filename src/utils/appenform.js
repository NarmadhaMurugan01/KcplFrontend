import React, { useState } from 'react';

function DynamicInputFields() {
  const [inputValues, setInputValues] = useState(['']);

  console.log(inputValues);

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, '']);
  };

  const handleRemoveInput = (index) => {
    const updatedValues = [...inputValues];
    updatedValues.splice(index, 1);
    setInputValues(updatedValues);
  };

  return (
    <div>
      {inputValues.map((value, index) => (
        <div key={index}>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
      <div>
        <strong>Values:</strong>
        <ul>
          {inputValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DynamicInputFields;
