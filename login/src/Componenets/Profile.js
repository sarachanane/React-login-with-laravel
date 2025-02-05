import React, { useState, useEffect } from 'react';
import { getUserData, Edit } from '../api/api';
import './../CSS/profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ onLogin })  {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [username, setUsername] = useState("leading..");
  const [email, setEmail] = useState("leading..");
  const [password, setPassword] = useState("leading..");
  const [createdAt, setCreatedAt] = useState(""); 
  const [userId, setUserId] = useState(null); 

 
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
        setCreatedAt(userData.created_at);
        setUserId(userData.id); 
      }
    };
    fetchUserData();
  }, []); 

  const toggleEditUsername = () => setIsEditingUsername(!isEditingUsername);
  const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);
  const toggleEditPassword = () => setIsEditingPassword(!isEditingPassword);

 
  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);  
    } else if (type === 'error') {
      toast.error(message);    
    }
  };

  const handleUpdate = async () => {
    if (!userId) {
      showToast('User ID not found!', 'error');
      return;
    }

  
    const { success, message } = await Edit(userId, username, email, password);

    if (success) {
      showToast(message, 'success');  
    } else {
      showToast(message, 'error');    
    }

    setIsEditingUsername(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };
  const handleLogout = async () => {
    showToast('loged out', 'success');
   localStorage.removeItem('username'); 
    setTimeout(onLogin, 1500); 
  };



  return (
    <div className="ProfilePage">
      <div className="ProfileContainer">
        <button className="LogoutButton" onClick={handleLogout}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h2 className="ProfileTitle">User Profile</h2>
        <div className="ProfileElements">
          <div className="ProfileField">
            <label>Username</label>
            <div className="InputContainer">
              <input 
                type="text" 
                value={username} 
                disabled={!isEditingUsername} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <button 
                className="EditButton" 
                onClick={toggleEditUsername}
              >
                {isEditingUsername ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
          <div className="ProfileField">
            <label>Email</label>
            <div className="InputContainer">
              <input 
                type="email" 
                value={email} 
                disabled={!isEditingEmail} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button 
                className="EditButton" 
                onClick={toggleEditEmail}
              >
                {isEditingEmail ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
          <div className="ProfileField">
            <label>Created On</label>
            <input 
              type="text" 
              value={createdAt ? new Date(createdAt).toLocaleDateString() : 'Loading...'} // Format the creation date
              disabled 
            />
          </div>
          <div className="ProfileField">
            <label>Password</label>
            <div className="InputContainer">
              <input 
                type="password" 
                value={password} 
                disabled={!isEditingPassword} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button 
                className="EditButton" 
                onClick={toggleEditPassword}
              >
                {isEditingPassword ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </div>

        {/* Update Button (Styled like Login Button) */}
        <div className="UpdateButtonContainer">
          <button className="UpdateButton" onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
