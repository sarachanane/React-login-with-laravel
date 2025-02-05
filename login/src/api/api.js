import axios from 'axios';


const apiUrl = 'http://127.0.0.1:8000';


export const loginUser = async (username, password) => {
  console.log("Login attempt started...");
  console.log(`API URL: ${apiUrl}/login`);

  try {
   
    console.log("Sending POST request to login endpoint with data:", { username, password });

    const response = await axios.post(`${apiUrl}/login`, {
      username,
      password,
    });

    
    console.log("Login successful. Response data:", response.data);

    return { success: true, message: response.data.message };
  } catch (error) {
   
    if (error.response) {
      console.log("Error response received from server:");
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);

      return { success: false, message: error.response.data.error };
    } else if (error.request) {
      console.log("No response received from the server:");
      console.log(error.request);

      return { success: false, message: 'No response from server' };
    } else {
      console.log("Error in request setup:");
      console.log(error.message);

      return { success: false, message: 'An error occurred' };
    }
  }
};

export const registerUser = async (username, email, password, showToast) => {
    try {
      
      const response = await axios.post(`${apiUrl}/register`, {
        username,
        email,
        password,
      });
  
      
      return { success: true, message: response.data.message };
      
    } catch (error) {
      
      if (error.response) {
        
        showToast(error.response.data.error, 'error');
        return { success: false, message: error.response.data.error };
      } else if (error.request) {
        
        showToast('No response from server', 'error');
        return { success: false, message: 'No response from server' };
      } else {
        
        showToast('An error occurred', 'error');
        return { success: false, message: 'An error occurred' };
      }
    }
  };
  


  export const googleAuth = async (username, email, id) => {
    try {
        const response = await axios.post(`${apiUrl}/googleauth`, {
            username,
            email,
            id,
        });

        
        return {
            success: true,
            message: response.data.message,
        };
    } catch (error) {
       
        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message, 
            };
        } else {
            return {
                success: false,
                message: 'An error occurred. Please try again later.', 
            };
        }
    }
};




export const getUserData = async () => {
  const username = localStorage.getItem('username'); 
  if (!username) {
    console.error("Username is not available");
    return null;
  }
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/user/${username}`); 
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const Edit = async (id, username, email, password) => {
  try {
    
    const response = await axios.post(`${apiUrl}/edit`, {
      id,
      username,
      email,
      password
    });

     
    return { success: true, message: response.data.message };
  } catch (error) {
      
    if (error.response) {
       
      return { success: false, message: error.response.data.error || 'Error occurred' };
    } else {
       
      return { success: false, message: 'No response from server' };
    }
  }
};