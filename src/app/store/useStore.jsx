import {create} from 'zustand';

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * useStore Hook
 *
 * This hook provides a global state management solution using Zustand. It manages the state for boards,
 * dark mode, and modal visibility, and includes actions for manipulating these states.
 *
 * State:
 * @param {Array} boards - List of board objects.
 * @param {Object|null} selectedBoard - The board object currently selected for editing.
 * @param {Object|null} activeBoard - The board object currently being viewed.
 * @param {boolean} isDarkMode - The state of the dark mode (true if dark mode is enabled).
 * @param {boolean} isModalOpen - The state of the modal visibility (true if a modal is open).
 * @param {string} modalType - The type of modal currently open.
 *
 * Actions:
 * @function createUniqueId - Generates a unique ID that does not exist in the provided object key.
 * @function createBoard - Adds a new board to the state and sets it as the active board.
 * @function updateBoard - Updates an existing board in the state.
 * @function selectBoardToEdit - Sets the selected board for editing.
 * @function changeActiveBoard - Sets the active board.
 * @function deleteBoard - Deletes a board from the state and updates the active board.
 * @function getBoardAmount - Returns the number of boards in the state.
 * @function toggleDarkMode - Toggles the dark mode state.
 * @function activateModal - Activates a modal with the specified type.
 * @function closeModal - Closes the modal.
 * @function createTask - Adds a new task to the appropriate column in the active board.
 */
const useStore = create((set, get) => ({
  // State variables
  boards: [],
  selectedBoard: null,
  activeBoard: null,
  isDarkMode: false,
  isModalOpen: false,
  modalType: '',

  // Unique ID generator
  createUniqueId: (object_key) => {
    let newId = generateId();
    while (Object.keys(object_key).includes(newId)) {
      newId = generateId();
    }
    return newId;
  },

  // Board actions

  /**
   * Adds a new board to the state and sets it as the active board.
   * @param {Object} newBoard - The new board object to be added.
   */
  createBoard: (newBoard) => set((state) => ({
    boards: [...state.boards, newBoard],
    activeBoard: newBoard,
  })),

  /**
   * Updates an existing board in the state.
   * @param {Object} updatedBoard - The board object with updated data.
   */
  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((board) =>
      board.board_id === updatedBoard.board_id ? updatedBoard : board
    ),
    activeBoard: updatedBoard,
  })),

  /**
   * Sets the selected board for editing.
   * @param {Object} board - The board object to be selected for editing.
   */
  selectBoardToEdit: (board) => set(() => ({
    selectedBoard: board,
  })),

  /**
   * Sets the active board.
   * @param {Object} board - The board object to be set as active.
   */
  changeActiveBoard: (board) => set(() => ({
    activeBoard: board,
  })),

  /**
   * Deletes a board from the state and updates the active board.
   * @param {string} boardId - The ID of the board to be deleted.
   */
  deleteBoard: (boardId) => set((state) => {
    const updatedBoards = state.boards.filter((board) => board.board_id !== boardId);
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.length > 0 ? updatedBoards[0] : null,
    };
  }),

  /**
   * Adds a new task to the appropriate column in the active board.
   * @param {Object} newTask - The new task object to be added.
   */
  createTask: (newTask) => set((state) => ({
    activeBoard: {
      ...state.activeBoard,
      board_data: {
        ...state.activeBoard.board_data,
        columns: state.activeBoard.board_data.columns.map((column) => {
          if (column.title === newTask.status) {
            return {
              ...column,
              task_list: [...column.task_list, newTask],
            };
          }
          return column;
        }),
      },
    },
  })),

  /**
   * Returns the number of boards in the state.
   * @returns {number} The number of boards.
   */
  getBoardAmount: () => get().boards.length,

  // Dark mode actions

  /**
   * Toggles the dark mode state.
   */
  toggleDarkMode: () => set((state) => ({
    isDarkMode: !state.isDarkMode,
  })),

  // Modal actions

  /**
   * Activates a modal with the specified type.
   * @param {string} modalType - The type of modal to be activated.
   */
  activateModal: (modalType) => set(() => ({
    isModalOpen: true,
    modalType,
  })),

  /**
   * Closes the modal.
   */
  closeModal: () => set(() => ({
    isModalOpen: false,
    modalType: '',
  })),
}));

export default useStore;
