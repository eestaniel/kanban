import { useCallback } from "react";

const useInputValidator = () => {

  // General validation function for handling common logic
  const validateCommon = (newValue, maxLength, allowedCharsRegex, fieldName) => {
    if (!newValue.trim()) {
      return `${fieldName} cannot be empty`;
    }
    if (newValue.length > maxLength) {
      return `${fieldName} cannot exceed ${maxLength} characters`;
    }
    if (!allowedCharsRegex.test(newValue)) {
      return `${fieldName} can only contain letters and numbers`;
    }
    return ''; // No error
  };

  const validateInput = useCallback((newValue, inputType) => {
    switch (inputType) {
      case 'column-title':
        return validateCommon(newValue, 16, /^[a-zA-Z0-9\s]*$/, 'Column title');
      case 'board-name':
        return validateCommon(newValue, 16, /^[a-zA-Z0-9\s]*$/, 'Board name');
      default:
        return newValue.trim() === '' ? 'Field cannot be empty' : '';
    }
  }, []);

  return { validateInput };
};

export default useInputValidator;
