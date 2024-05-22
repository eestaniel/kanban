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
 * @param {Object} initialData - The initial data for the currently viewed task.
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
 * @function updateTask - Updates a task in the initialData.
 * @function updateActiveBoard - Updates the active board and saves changes to the boards array.
 */
const useStore = create((set, get) => ({
  // State variables
  boards: [],
  selectedBoard: null,
  activeBoard: null,
  isDarkMode: true,
  isModalOpen: false,
  modalType: '',
  initialData: {},

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
   * Initializes the board state with the provided data and sets the first board as active.
   * @param {Array} boardData - List of board objects to initialize the state.
   * @returns {void}
   * */
  initializeBoard: (boardData) => set(() => ({
    boards: boardData,
    activeBoard: boardData.length > 0 ? boardData[0] : null,
  })),


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
    // reset initialData
    initialData: {},
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
   * Adds a new task to the appropriate column in the active board and updates the boards array.
   * @param {Object} newTask - The new task object to be added.
   */
  createTask: (newTask) => set((state) => {
    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: state.activeBoard.columns.map((column) => {
        if (column.name === newTask.status) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      }),
    };
    // Update the active board and the boards array
    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board
      ),
    };
  }),

  /**
   * Updates the initialData task.
   * @param {Object} updatedTask - The task object with updated data.
   */
  updateTask: (updatedTask) => set((state) => {
    const updatedActiveBoard = {
      ...state.activeBoard,
      board_data: {
        ...state.activeBoard.board_data,
        columns: state.activeBoard.board_data.columns.map((column) => ({
          ...column,
          task_list: column.task_list.map((task) =>
            task.task_id === updatedTask.task_id ? updatedTask : task
          ),
        })),
      },
    };

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board
      ),
      initialData: updatedTask,
    };
  }),

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
   * @param {Object} initialData - The initial data for the modal.
   */
  activateModal: (modalType, initialData) => set(() => ({
    isModalOpen: true,
    modalType,
    initialData,
  })),

  /**
   * Closes the modal.
   */
  closeModal: () => set(() => ({
    isModalOpen: false,
    modalType: '',
    initialData: {},
  })),
}));

export default useStore;
