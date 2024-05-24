import {create} from 'zustand';

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Utility function to move an item within an array
 * @param {Array} array - The array to modify
 * @param {number} fromIndex - Index of the item to move
 * @param {number} toIndex - Index where the item should be moved
 * @returns {Array} - New array with the item moved
 */
const arrayMove = (array, fromIndex, toIndex) => {
  const newArray = array.slice();
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);
  return newArray;
};


/**
 * Zustand store to manage the application state
 * @returns {Object} - Store object with state variables and actions
 * @property {Array} boards - List of boards
 * @property {Object} selectedBoard - Board selected for editing
 * @property {Object} activeBoard - Board currently being viewed
 * @property {boolean} isDarkMode - Flag to toggle dark mode
 * @property {boolean} isModalOpen - Flag to toggle modal visibility
 * @property {string} modalType - Type of modal to display
 * @property {Object} initialData - Initial data for the modal
 * @property {boolean} isSidePanelOpen - Flag to toggle side panel visibility
 * @property {Function} createUniqueId - Function to generate unique IDs
 * @property {Function} initializeBoard - Action to initialize the board data
 * @property {Function} createBoard - Action to create a new board
 * @property {Function} updateBoard - Action to update an existing board
 * @property {Function} selectBoardToEdit - Action to select a board for editing
 * @property {Function} changeActiveBoard - Action to change the active board
 * @property {Function} deleteBoard - Action to delete a board
 * @property {Function} getBoardAmount - Action to get the number of boards
 * @property {Function} createTask - Action to create a new task
 * @property {Function} updateTask - Action to update a task
 * @property {Function} updateTaskPositions - Action to update task positions
 * @property {Function} toggleDarkMode - Action to toggle dark mode
 * @property {Function} activateModal - Action to activate a modal
 * @property {Function} closeModal - Action to close the modal
 * @property {Function} toggleSidePanel - Action to toggle the side panel
 * */
const useStore = create((set, get) => ({
  // State variables
  boards: [],
  selectedBoard: null,
  activeBoard: null,
  isDarkMode: true,
  isModalOpen: false,
  modalType: '',
  initialData: {},
  isSidePanelOpen: true,

  // Unique ID generator
  createUniqueId: (objectKey) => {
    let newId = generateId();
    while (Object.keys(objectKey).includes(newId)) {
      newId = generateId();
    }
    return newId;
  },

  // Board actions
  initializeBoard: (boardData) => set({
    boards: boardData,
    activeBoard: boardData.length > 0 ? boardData[0] : null,
  }),

  createBoard: (newBoard) => set((state) => ({
    boards: [...state.boards, newBoard],
    activeBoard: newBoard,
  })),

  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((board) => board.name === updatedBoard.name ? updatedBoard : board),
    activeBoard: updatedBoard,
  })),

  selectBoardToEdit: (board) => set({selectedBoard: board}),

  changeActiveBoard: (board) => set({
    activeBoard: board,
    initialData: {},
  }),

  deleteBoard: (boardId) => set((state) => {
    const updatedBoards = state.boards.filter((board) => board.name !== boardId);
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.length > 0 ? updatedBoards[0] : null,
    };
  }),

  getBoardAmount: () => get().boards.length,

  // Task actions
  createTask: (newTask) => set((state) => {
    const updatedColumns = state.activeBoard.columns.map((column) => {
      if (column.name === newTask.status) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }
      return column;
    });

    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: updatedColumns,
    };

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
    };
  }),

  updateTask: (updatedTask, type) => set((state) => {
    let updatedActiveBoard;

    switch (type) {
      case 'checklist':
        updatedActiveBoard = {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) => task.name === updatedTask.name ? updatedTask : task),
          })),
        };
        break;

      case 'status':
        updatedActiveBoard = {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((column) => {
            if (column.name === updatedTask.status) {
              return {
                ...column,
                tasks: [
                  ...column.tasks.filter((task) => task.name !== updatedTask.name),
                  updatedTask,
                ],
              };
            }
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.name !== updatedTask.name),
            };
          }),
        };
        break;

      case 'edit':
        const oldStatus = state.initialData.status;
        const newStatus = updatedTask.status;

        updatedActiveBoard = {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((column) => {
            if (column.name === oldStatus) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.name !== state.initialData.name),
              };
            }
            if (column.name === newStatus) {
              return {
                ...column,
                tasks: [...column.tasks, updatedTask],
              };
            }
            return column;
          }),
        };
        break;

      default:
        return state;
    }

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
      initialData: updatedTask,
    };
  }),

  updateTaskPositions: (activeId, overId, newColumnId) => set((state) => {
    const activeTask = state.activeBoard.columns.flatMap((column) => column.tasks).find((task) => task.name === activeId);
    const activeColumn = state.activeBoard.columns.find((column) => column.tasks.includes(activeTask));
    const overColumn = state.activeBoard.columns.find((column) => column.name === newColumnId);

    if (!activeTask || !activeColumn || !overColumn) {
      return state;
    }

    const activeTasks = activeColumn.tasks.filter((task) => task.name !== activeId);
    const overTasks = overColumn.tasks;
    const overIndex = overTasks.findIndex((task) => task.name === overId);

    if (activeColumn === overColumn) {
      const newTasks = arrayMove(overTasks, overTasks.indexOf(activeTask), overIndex);
      const updatedActiveBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => column === activeColumn ? {
          ...column,
          tasks: newTasks
        } : column),
      };
      return {
        activeBoard: updatedActiveBoard,
        boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
      };
    } else {
      const newTasks = overIndex === -1 ? [...overTasks, activeTask] : [
        ...overTasks.slice(0, overIndex),
        activeTask,
        ...overTasks.slice(overIndex),
      ];
      const updatedActiveBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => {
          if (column === activeColumn) {
            return {...column, tasks: activeTasks};
          }
          if (column === overColumn) {
            return {...column, tasks: newTasks};
          }
          return column;
        }),
      };
      return {
        activeBoard: updatedActiveBoard,
        boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
      };
    }
  }),

  // Dark mode actions
  toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode})),

  // Modal actions
  activateModal: (modalType, initialData) => set({isModalOpen: true, modalType, initialData}),

  closeModal: () => set({isModalOpen: false, modalType: '', initialData: {}}),

  // Side panel actions
  toggleSidePanel: () => set((state) => ({isSidePanelOpen: !state.isSidePanelOpen})),
}));

export default useStore;
