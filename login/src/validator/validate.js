
export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };
  

  export const sanitizeInput = (input) => {
    return input.replace(/<script.*?>.*?<\/script>/gi, "")
                .replace(/[<>]/g, "")  
                .replace(/["'`]/g, "");  
  };
  