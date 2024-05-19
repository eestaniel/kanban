import { useState } from "react";

const useInputValidator = (initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const validateInput = (newValue) => {
    // Example validation: non-empty and less than 50 characters
    setIsValid(newValue.trim() !== "" && newValue.length < 50);
  };

  const handleChange = (newValue) => {
    validateInput(newValue);
    setInputValue(newValue);
  };

  return { inputValue, handleChange, isValid };
};

export default useInputValidator;
