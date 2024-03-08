import React, { useState } from 'react';

const FamilyForm = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [name, setName] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [relationship, setRelationship] = useState('');
  const [error, setError] = useState('');
  const [dob, setDob] = useState('');

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    const daysDiff = currentDate.getDate() - birthDate.getDate();

    let calculatedYears = yearsDiff;
    let calculatedMonths = monthsDiff;

    if (daysDiff < 0) {
      calculatedMonths -= 1;
    }

    if (monthsDiff < 0) {
      calculatedYears -= 1;
      calculatedMonths += 12;
    }

    return {
      years: calculatedYears.toString(),
      months: calculatedMonths.toString(),
    };
  };
  const [profileData, setProfileData] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setDob(newDob);

    const calculatedAge = calculateAge(newDob);
    setAgeYears(calculatedAge.years);
    setAgeMonths(calculatedAge.months);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRelationshipChange = (e) => {
    setRelationship(e.target.value);
  };

  const handleAddClick = () => {
    if (name && ageYears && ageMonths && relationship && dob) {
      const newMember = {
        name,
        ageYears,
        ageMonths,
        dob,
        time: profileData.time,
        relationship,
      };

      setFamilyMembers([newMember]);

      setName('');
      setAgeYears('');
      setAgeMonths('');
      setDob('');
      setRelationship('');
      setProfileData({ time: '' });
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };


  return (
    <div className='py-4'>
      <h2 className='labels'>Relationship Details:</h2>

      <div className='row my-3 dmo_align'>
        <div className='col-md-2 col-12 dmo_flex0 pb-2'>
          <label className='form-label' htmlFor='name'>
            Name:
          </label>
          <input
            className='form-control'
            type='text'
            id='name'
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className='col-md-2 col-12 dmo_flex0 pb-2'>
          <label className='form-label' htmlFor='dob'>
            DOB
          </label>
          <input
            className='form-control'
            type='date'
            id='dob'
            value={dob}
            onChange={handleDobChange}
          />

        </div>
        <div className='col-md-2 col-12 dmo_flex0 pb-2'>
        <label className='form-label' htmlFor='time'>Time</label>
        <input
            type='time'
            className='form-control'
            placeholder='Time'
            value={profileData.time}
            onChange={handleChange}
            name='time'
          />
                </div>
        <div className='col-md-2 col-12 dmo_flex0 pb-2'>
          <label className='form-label' htmlFor='age'>
            Age:
          </label>
          <input
            className='form-control'
            type='text'
            id='age'
            value={`${ageYears} years ${ageMonths} months`}
            readOnly
          />
        </div>
        <div className='col-md-3 col-12 dmo_flex0 pb-2'>
  <label className='form-label' htmlFor='relationship'>
    Relationship:
  </label>
  <select
    className='form-control'
    id='relationship'
    value={relationship}
    onChange={handleRelationshipChange}
  >
    <option value='' disabled>Select Relationship</option>
    <option value='father'>father</option>
    <option value='mother'>mother</option>
    <option value='son'>son</option>
    <option value='daughter'>Daughter</option>
    <option value='brother'>brother</option>
    <option value='grandmother'>Grandmother / Grandma</option>
    <option value='grandfather'>Grandfather / Grandpa</option>
    <option value='grandchild'>Grandchild</option>
    <option value='aunt'>Aunt</option>
    <option value='uncle'>uncle</option>
    <option value='niece'>Niece</option>
    <option value='nephew'>Nephew</option>
    <option value='first cousin'>First Cousin</option>
    <option value='Second cousin'>Second Cousin</option>
    <option value='mother in law'>mother-in-law</option>
    <option value='father in law'>Father-in-law</option>
    <option value='brother in law'>Brother-in-law</option>
    <option value='sister in law'>Sister-in-law</option>
    <option value='wife'>Wife</option>
    <option value='stepmother'>Stepmother / Stepmom</option>
    <option value='stepfather'>Stepfather / Stepdad</option>
    <option value='stepchild'>Stepchild</option>
    <option value='guardian'>Guardian</option>
    <option value='ward'>Ward</option>
  </select>
        </div>
        <div className='col-12 col-md-1 pb-2'>
        <button
          className='btn btn-outline-primary'
          onClick={handleAddClick}
        >
          +
        </button>
        </div>
       
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {familyMembers.map((member, index) => (
        <div className='row' key={index}>
          <h3 className='labels col-12 px-2'>Family Member {index + 1}:</h3>
          <p className='col-12 col-md-3'>Name: {member.name}</p>
          <p className='col-12 col-md-3'>DOB: {member.dob}</p>
          <p className='col-12 col-md-3'>Time: {member.time}</p>
          <p className='col-12 col-md-3'>Age: {`${member.ageYears} years ${member.ageMonths} months`}</p>
          <p className='col-12 col-md-3'>Relationship: {member.relationship}</p>
        </div>
      ))}
    </div>
  );
};

export default FamilyForm;
