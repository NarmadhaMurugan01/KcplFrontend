import React, { useState } from 'react';

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
  );
  const [username] = useState('Sample');
  const [email] = useState('sample@mail.com.y');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePic(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="col-12 border-right">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">User Profile</h4>
        </div>
        <label htmlFor="profilePicInput" className="cursor-pointer">
          <img
            className="rounded-circle mt-5"
            width="150px"
            src={profilePic}
            alt="Profile"
          />
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
        <span className="font-weight-bold">{username}</span>
        <span className="text-black-50">{email}</span>
      </div>
    </div>
  );
};

export default UserProfile;
