import { useState } from 'react';

const useValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone Number must be a number';
    }else if(formData.phoneNumber.toString().length<10){
      formErrors.phoneNumber="Phone Number must be of minimum length 10";
    }


    if (formData.position === 'Developer' || formData.position === 'Designer') {
      if (!formData.relevantExperience || formData.relevantExperience <= 0) {
        formErrors.relevantExperience = 'Relevant Experience must be greater than 0';
      }
    }
    
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      formErrors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.position === 'Designer' && !/^https?:\/\/.+/.test(formData.portfolioURL)) {
      formErrors.portfolioURL = 'Portfolio URL is invalid';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      formErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      formErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime) {
      formErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
