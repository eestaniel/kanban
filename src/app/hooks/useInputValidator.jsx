import { useCallback } from "react";
import useStore from "@/app/store/useStore";
import DOMPurify from 'dompurify';

const useInputValidator = () => {
  const { boards } = useStore((state) => ({
    boards: state.boards,
  }));

  // General validation function for handling common logic
  const validateCommon = (newValue, maxLength, fieldName, isDescription=false) => {
    if (!isDescription && !newValue.trim()) {
      return `${fieldName} cannot be empty`;
    }
    if (newValue.length > maxLength) {
      return `${fieldName} cannot exceed ${maxLength} characters`;
    }
    return ''; // No error
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const validateInput = useCallback((newValue, inputType, mode = '') => {
    // Sanitize the input
    const sanitizedValue = sanitizeInput(newValue);

    switch (inputType) {
      case 'column-name':
      case 'task-name':
        return validateCommon(sanitizedValue, 256, 'Column name');

      case 'task-description':
        return validateCommon(sanitizedValue, 1024, 'Description', true);

      case 'board-name':
        let boardNameError = validateCommon(sanitizedValue, 256, 'Board name');
        if (boardNameError) {
          return boardNameError;
        }

        if (mode !== 'edit') {
          const boardNames = boards.map((board) => board.name.toLowerCase());
          if (boardNames.includes(sanitizedValue.toLowerCase())) {
            return 'Board name already exists';
          }
        }
        return '';

      default:
        return sanitizedValue.trim() === '' ? 'Field cannot be empty' : '';
    }
  }, [boards]);

  return { validateInput };
};

export default useInputValidator;
