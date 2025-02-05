import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './../CSS/MobileLogin.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { validateEmail } from '../validator/validate'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, registerUser ,googleAuth } from '../api/api';
import { FcGoogle } from 'react-icons/fc';

const LoginButtonVar = {
  open: {
    backgroundColor: '#E2E8F0',
    color: '#2D3748',
    transition: {
      duration: 0.2,
    },
  },
  close: {
    backgroundColor: '#2D3748',
    color: '#E2E8F0',
    borderRadius: '0 0 1rem 0',
    transition: {
      duration: 0.2,
    },
  },
};

const SignupButtonVar = {
  open: {
    backgroundColor: '#E2E8F0',
    color: '#2D3748',
    transition: {
      duration: 0.2,
    },
  },
  close: {
    backgroundColor: '#2D3748',
    color: '#E2E8F0',
    borderRadius: '0 0 0 1rem',
    transition: {
      duration: 0.2,
    },
  },
};

const ContVar = {
  init: {
    x: 600,
    display: 'none',
    transition: {
      duration: 0.3,
    },
  },
  anim: {
    x: 0,
    display: 'flex',
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  close: {
    x: -600,
    transition: {
      duration: 0.3,
    },
  },
};

export default function MobileLogin({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [UN, setUN] = useState('');
    const [PW, setPW] = useState('');
    const [RPW, setRPW] = useState('');
    const [email, setEmail] = useState('');

  const showToast = (message) => {
    toast.error(message, { position: "top-center" });
  };

  const handleLogin = async () => {
    if (!username && !password) {
      showToast('Please fill in both the username and password');
      return;
    }
    if (!username) {
      showToast('Please fill in the username');
      return;
    }
    if (!password) {
      showToast('Please fill in the password');
      return;
    }

    const result = await loginUser(username, password);
    if (result.success) {
      toast.success(result.message);  
      localStorage.setItem('username', username);
      setTimeout(handleLoginn, 1500); 
    } else {
      showToast(result.message); 
    }
  };

  const handleSignin = async () => {
    if (!email || !UN || !PW || !RPW) {
      showToast('All fields are required!', 'error');
      return;
    }
  
    if (!validateEmail(email)) {
      showToast('Invalid email address!', 'error');
      return;
    }
  
    if (PW !== RPW) {
      showToast('Passwords do not match!', 'error');
      return;
    }
  
    const { success, message } = await registerUser(UN, email, PW, showToast);
    if (success) {

      toast.success('Registration successful!');
    } 
  };
  
  
  const handleGoogleSuccess = async (response) => {
    console.log('Google login successful:', response);
    
    const credential = response.credential;
    const token = credential;
    const decoded = jwtDecode(token);
    console.log('Decoded user data:', decoded);

    const googleEmail = decoded.email; 
    const googleUsername = decoded.name; 
    const googleId = decoded.sub; 


    if (!googleUsername || !googleEmail || !googleId) {
        toast.error('Google login failed. Missing user details.');
        return;
    }

   
    const result = await googleAuth(googleUsername, googleEmail, googleId);
    
   
    if (result.success) {
        toast.success(result.message);  
        
          
            localStorage.setItem('username', googleUsername);
            setTimeout(handleLoginn, 1500); 
         

    } else {
        toast.error(result.message);  
    }
};

const handleGoogleError = (error) => {
    console.log('Google login failed:', error);
    toast.error('Google login failed. Please try again.');
};

const handleLoginn = () => {
  onLogin(); 
};









  return (
<GoogleOAuthProvider clientId="put yoo google auth client id">
    <AnimatePresence>
    <motion.div className="Mobile">
      <motion.div className="Selector">
        <motion.button
          initial={isLogin ? 'open' : 'close'}
          animate={isLogin ? 'open' : 'close'}
          variants={LoginButtonVar}
          className="SelectorButton"
          onClick={() => setIsLogin(true)}>
          Login
        </motion.button>
        <motion.button
          initial={!isLogin ? 'open' : 'close'}
          animate={!isLogin ? 'open' : 'close'}
          variants={SignupButtonVar}
          className="SelectorButton"
          onClick={() => setIsLogin(false)}>
          SignUp
        </motion.button>
      </motion.div>
      <AnimatePresence initial={false}>
        {isLogin && (
          <motion.div
            key="login"
            className="SelectedElements"
            initial="init"
            animate="anim"
            exit="close"
            variants={ContVar}>


              <div className="MobileElements">
                              <input
                                className="InputField"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                className="InputField"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <button className="ForgotPass"   onClick={handleLoginn}>Forgot Password?</button>
              
                              <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                              >
                                <button className="BtnField GoogleBtn">
                                  <FcGoogle
                                    size="1.2rem"
                                    style={{
                                      marginRight: '0.15rem',
                                      verticalAlign: 'middle',
                                    }}
                                  />
                                  Login with Google
                                </button>
                              </GoogleLogin>
                            </div>
            <motion.button
              className="MBtnField"
              onClick={() => {
                if (isLogin) {
                  handleLogin();
                }
                setIsLogin(true);
              }}>
              Login
            </motion.button>
          </motion.div>
        )}
        {!isLogin && (
          <motion.div
            key="signup"
            className="SelectedElements"
            initial="init"
            animate="anim"
            exit="close"
            variants={ContVar}>
            
            <div className="MobileElements">
                <input
                  className="InputField"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="InputField"
                  placeholder="Username"
                  value={UN}
                  onChange={(e) => setUN(e.target.value)}
                />
                <input
                  className="InputField"
                  placeholder="Password"
                  type="password"
                  value={PW}
                  onChange={(e) => setPW(e.target.value)}
                />
                <input
                  className="InputField"
                  placeholder="Confirm Password"
                  type="password"
                  value={RPW}
                  onChange={(e) => setRPW(e.target.value)}
                />
              </div>
            <motion.button
              className="MBtnField"
              onClick={() => {
                if (isLogin === false) {
                  handleSignin();
                }
                setIsLogin(false);
              }}>
              SignUp
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
     </AnimatePresence>
    
          
          <ToastContainer />
 </GoogleOAuthProvider>
  );
}
