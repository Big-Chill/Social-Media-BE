  // const faker = require('faker');

  const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };
  
const generateRandomCaption = async () => {
    const caption = 'lorem ipsum';
    return caption;
};




  module.exports = {
    isValidEmail,
    generateRandomCaption
  };