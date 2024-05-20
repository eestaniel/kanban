import { useCallback } from "react";

const useInputValidator = () => {

  const validateInput = useCallback((newValue, inputType) => {
    let error = '';
    switch (inputType) {
      case 'column-title':
        if (!newValue.trim()) {
          error = 'Column title cannot be empty';
        } else if (newValue.length > 16) {
          error = 'Column title cannot exceed 16 characters';
        }
        break;
      default:
        error = newValue.trim() === '' ? 'Field cannot be empty' : '';
    }
    return error;
  }, []);

  return { validateInput };
};

export default useInputValidator;
