import {useCallback} from "react";
import useStore from "@/app/store/useStore";

const useInputValidator = () => {

  const {boards} = useStore((state) => ({
    boards: state.boards,
  }));


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
      // Validate column name
      case 'column-name':
      case 'task-name':
        return validateCommon(newValue, 16, /^[a-zA-Z0-9\s]*$/, 'Column name');

      // Validate board name
      case 'board-name':

        // check for empty string, length, and allowed characters using validateCommon
        let boardNameError = validateCommon(newValue, 16, /^[a-zA-Z0-9\s]*$/, 'Board name');
        if (boardNameError) {
          return boardNameError;
        }

          // check if board name already exists
        if (boards.some(board => board.name.toLowerCase() === newValue.toLowerCase())) {
          return 'Board name already exists';
        }
        return '';
      default:
        return newValue.trim() === '' ? 'Field cannot be empty' : '';
    }
  }, [boards]);

  return {validateInput};
};

export default useInputValidator;
