import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './../CSS/DesktopLogin.css';
import { FcGoogle } from 'react-icons/fc';
import './../CSS/Elements.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { validateEmail } from '../validator/validate'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, registerUser ,googleAuth } from '../api/api';

const ConVariants = {
  open: {
    width: '65%',
    backgroundColor: '#E2E8F0',
    transition: {
      duration: 0.5,
    },
  },
  close: {
    width: '35%',
    backgroundColor: '#2D3748',
    transition: {
      duration: 0.5,
    },
  },
};

const InputVariants = {
  open: {
    opacity: 1,
    width: '55%',
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: 'block',
    },
  },
  close: {
    opacity: 0,
    width: '70%',
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

const ButtonVariants = {
  open: {
    backgroundColor: '#2D3748',
    color: '#E2E8F0',
    width: '55%',
    transition: {
      duration: 0.5,
    },
  },
  close: {
    backgroundColor: '#E2E8F0',
    color: '#2D3748',
    width: '65%',
    transition: {
      duration: 0.5,
    },
  },
};

export default function DesktopLogin({ onLogin }) {
  
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
        <motion.div className="Desktop">
          <motion.div
            className="Container"
            layout
            initial={isLogin ? 'open' : 'close'}
            animate={isLogin ? 'open' : 'close'}
            variants={ConVariants}>
            <motion.div variants={InputVariants} style={{ height: '60%' }}>
              <div className="Elements">
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
            </motion.div>
            <motion.div
              style={{ height: '60%' }}
              className="CloseTitle"
              variants={InputVariants}
              initial={isLogin ? 'close' : 'open'}
              animate={isLogin ? 'close' : 'open'}>
              <h2 style={{ position: 'relative', top: '40%' }}>
                Already a <br />
                member?
              </h2>
            </motion.div>
            <motion.button
              onClick={() => {
                if (isLogin) {
                  handleLogin();
                }
                setIsLogin(true);
              }}
              className="BtnField"
              variants={ButtonVariants}>
              Login
            </motion.button>
          </motion.div>

          <motion.div
            className="Container"
            layout
            initial={isLogin ? 'close' : 'open'}
            animate={isLogin ? 'close' : 'open'}
            variants={ConVariants}>
            <motion.div variants={InputVariants} style={{ height: '60%' }}>
              <div className="Elements">
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
            </motion.div>
            <motion.div
              style={{ height: '60%' }}
              className="CloseTitle"
              variants={InputVariants}
              initial={isLogin ? 'open' : 'close'}
              animate={isLogin ? 'open' : 'close'}>
              <h2 style={{ position: 'relative', top: '50%' }}>New Here?</h2>
            </motion.div>
            <motion.button
              onClick={() => {
                if (isLogin === false) {
                  handleSignin();
                }
                setIsLogin(false);
              }}
              className="BtnField"
              variants={ButtonVariants}>
              SignUp
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}
