import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WebFont from 'webfontloader';
import DesktopLogin from './DesktopLogin';
import OtpInputWithValidation from './OtpInputWithValidation';
import './../CSS/App.css'

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Dosis', 'Plus Jakarta Sans'],
      },
    });
  }, []);

  return (
    
        <OtpInputWithValidation className="App"/>
        
      
  );
}

export default App;
