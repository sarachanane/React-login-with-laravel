import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WebFont from 'webfontloader';
import DesktopLogin from './DesktopLogin';
import MobileLogin from './MobileLogin';
import ProfilePage from './Profile'; 
import './../CSS/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Dosis', 'Plus Jakarta Sans'],
      },
    });
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <AnimatePresence>
      <motion.div className="App">
        
        {!isLoggedIn ? (
          <>
            <MobileLogin onLogin={handleLoginSuccess} />
            <DesktopLogin onLogin={handleLoginSuccess} />
          </>
        ) : (
          <ProfilePage onLogin={handleLogout} /> 
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
