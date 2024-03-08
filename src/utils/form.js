import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phoneNumber1: Yup.number().required('Phone Number is required'),
  street: Yup.string().required('Street is required'),
  placeVillage: Yup.string().required('Place/Village is required'),
  taluk: Yup.string().required('Taluk is required'),
  selectedDistrict: Yup.string().required('District is required'),
  zipCode: Yup.number().required('Zip Code is required'),
  idProof: Yup.string().required('ID Proof is required'),
  idNumber: Yup.string().required('ID Number is required'),
  issueDate: Yup.date().required('Issue Date is required'),
  selectedCountry: Yup.string().required('Country is required'),
  issuingAuthority: Yup.string().required('Issuing Authority is required'),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber1: '',
      street: '',
      placeVillage: '',
      taluk: '',
      selectedDistrict: '',
      zipCode: '',
      idProof: '',
      idNumber: '',
      issueDate: '',
      selectedCountry: '',
      issuingAuthority: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="col-6 my-2">
        <label className="mb-1" htmlFor="">
          Phone Number
        </label>
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Enter your mobile no"
          name="phoneNumber1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber1}
        />
        {formik.touched.phoneNumber1 && formik.errors.phoneNumber1 && (
          <div className="error">{formik.errors.phoneNumber1}</div>
        )}
      </div>
      {/* ... Other form fields ... */}
      <div className="text-center mt-2">
        <button type="button" className="btn btn-danger me-2" onClick={formik.handleReset}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MyForm;
