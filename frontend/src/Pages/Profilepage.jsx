import React, { useEffect, useState } from 'react';
import './CSS/Profilepage.css';

const ProfilePageContainer = () => {
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');

    if (authToken) {
      fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setEditedUserData({
            phoneNumber: data.phonenumber || '',
            password: '', // Set to empty for security reasons, users should enter their current password
          });
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, []); // Run once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleUpdateProfile = () => {
    const authToken = localStorage.getItem('auth-token');
    const userId = userData._id;

    fetch(`http://localhost:4000/updateprofile/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(editedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the server response
        setEditing(false); // Reset the editing state on successful update
      })
      .catch((error) => console.error('Error updating user profile:', error));
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-section">
          <h1>{userData.name}'s Profile</h1>
          <p>Email: {userData.email}</p>
          {editing ? (
            <>
              <label>
                New Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedUserData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  name="password"
                  value={editedUserData.password}
                  onChange={handleInputChange}
                />
              </label>
            </>
          ) : (
            <>
              {userData.phonenumber && <p>Phone: {userData.phonenumber}</p>}
              {userData.password && <p>Password: ********</p>}
            </>
          )}
          <div>
            {editing ? (
              <>
                <button onClick={handleUpdateProfile}>Save Changes</button>
                <button onClick={handleEditToggle}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditToggle}>Edit Profile</button>
            )}
          </div>
        </div>
      ) : (
        <p className="loading">Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePageContainer;
