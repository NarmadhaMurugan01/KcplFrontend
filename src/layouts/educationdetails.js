import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const EducationDetails = () => {
  const [educationDetails, setEducationDetails] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const degreeSpecializations = [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Aerospace Engineering',
    'Chemical Engineering',
    'Computer Engineering',
    'Environmental Engineering',
    'Software Engineering',
    'Artificial Intelligence',
    'Data Science',
    'Cybersecurity',
    'Information Systems',
    'Web Development',
    'Mobile App Development',
    'Nursing',
    'Medicine',
    'Pharmacy',
    'Public Health',
    'Physical Therapy',
    'Occupational Therapy',
    'Radiology',
    'Finance',
    'Marketing',
    'Human Resources',
    'International Business',
    'Entrepreneurship',
    'Operations Management',
    'Supply Chain Management',
    'Psychology',
    'Sociology',
    'Anthropology',
    'Political Science',
    'Economics',
    'International Relations',
    'Criminology',
    'Biology',
    'Chemistry',
    'Physics',
    'Environmental Science',
    'Geology',
    'Astronomy',
    'Mathematics',
    'English Literature',
    'History',
    'Philosophy',
    'Fine Arts',
    'Linguistics',
    'Cultural Studies',
    'Music',
    'Elementary Education',
    'Secondary Education',
    'Special Education',
    'Educational Leadership',
    'Curriculum and Instruction',
    'Counseling',
    'Journalism',
    'Public Relations',
    'Media Studies',
    'Advertising',
    'Broadcasting',
    'Digital Media',
    'Information Technology',
    'Network Administration',
    'Cybersecurity',
    'Cloud Computing',
    'Digital Forensics',
    'IT Management',
    'Graphic Design',
    'Industrial Design',
    'Interior Design',
    'Fashion Design',
    'UX/UI Design',
    'Game Design',
    'Agronomy',
    'Horticulture',
    'Forestry',
    'Soil Science',
    'Environmental Management',
    'Wildlife Biology',
  ];

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
    highestQualification: "",
    specialization: "",
    collegeName: "",
    graduatedYear: "",
    educationType: "",
  });
  const [highestEducationOptions] = useState([
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D.',
  ]);
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    const newEducation = { ...currentEducation };
    setEducationDetails((prevDetails) => [...prevDetails, newEducation]);
    setCurrentEducation({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
      highestQualification: "",
      specialization: "",
      collegeName: "",
      graduatedYear: "",
      educationType: "",
    });
  };
  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };


  return (
    <div>
        <div className="row my-4 justify-content-start align-items-center">
        <div className="row px-4 my-4">
          <label className="labels col-12 col-md-2">Education Details:</label>
          <div className="col-12 col-md-4">
            <button
              className="btn btn-primary profile-button dmo_salebtn"
              type="button"
              onClick={handleAddEducation}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-12">
          <label className="form-label py-2">Highest Qualification:</label>
        <select
          className="form-control"
          onChange={handleEducationChange}
          name="highestQualification"
          value={currentEducation.highestQualification}>
          <option value="" >Select Highest Qualification</option>
          {highestEducationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
          </div>
          <div className="col-md-3 col-12">
            <label className="form-label py-2">College/University Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter College/University Name"
              onChange={handleEducationChange}
              name="collegeName"
              value={currentEducation.collegeName}/>
          </div>
          <div className="col-md-2 col-12">
            <label className="form-label py-2">Education Type:</label>
            <select
              className="form-control"
              onChange={handleEducationChange}
              name="educationType"
              value={currentEducation.educationType}
            >
              <option value="fullTime">Full-time</option>
              <option value="partTime">Part-time</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="col-md-2 col-12">
            <label className="form-label py-2">Specialization:</label>
            <select
                    id="degreeSpecialization"
              className="form-control"
              onChange={handleSpecializationChange}
              name="specialization"
              value={selectedSpecialization}
              >
               <option value="">Select Specialization</option>
        {degreeSpecializations.map((specialization, index) => (
          <option key={index} value={specialization}>
            {specialization}
          </option>
        ))}
            </select>

          </div>
          <div className="col-md-2 col-12">
            <label className="form-label py-2">Start Year:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Start Date"
              onChange={handleEducationChange}
              name="startDate"
              value={currentEducation.startDate}/>
          </div>
          <div className="col-md-2 col-12">
            <label className="form-label py-2">End Year:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter End Date"
              onChange={handleEducationChange}
              name="endDate"
              value={currentEducation.endDate}/>
          </div>
          <div className="col-md-2 col-12">
            <label className="form-label py-2">Grade:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Grade"
              onChange={handleEducationChange}
              name="grade"
              value={currentEducation.grade}/>
          </div>
        </div>
      </div>

      {educationDetails.map((education, index) => (
        <div className="row" key={index}>
          <h5 className="labels col-12 col-md-2 px-3">Education Details:</h5>
          <p className="col-12 col-md-2">College/University Name: {education.collegeName}</p>
          <p className="col-12 col-md-2">Highest Qualification: {education.highestQualification}</p>
          <p className="col-12 col-md-2">Specialization: {education.specialization}</p>
          <p className="col-12 col-md-2">Education Type: {education.educationType}</p>
          <p className="col-12 col-md-2">Start Date: {education.startDate}</p>
          <p className="col-12 col-md-2">End Date: {education.endDate}</p>
          <p className="col-12 col-md-2">Grade: {education.grade}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default EducationDetails;
