import {create} from 'zustand';

const arrayMove = (array, fromIndex, toIndex) => {
  const newArray = array.slice();
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);
  return newArray;
};


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
 * @function toggleSidePanel - Toggles the side panel visibility.
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
  initializeBoard: (boardData) => set(() => ({
    boards: boardData,
    activeBoard: boardData.length > 0 ? boardData[0] : null,
  })),

  createBoard: (newBoard) => set((state) => ({
    boards: [...state.boards, newBoard],
    activeBoard: newBoard,
  })),

  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((board) =>
      board.name === updatedBoard.name ? updatedBoard : board
    ),
    activeBoard: updatedBoard,
  })),

  selectBoardToEdit: (board) => set(() => ({
    selectedBoard: board,
  })),

  changeActiveBoard: (board) => set(() => ({
    activeBoard: board,
    initialData: {},
  })),

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
    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board
      ),
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
            tasks: column.tasks.map((task) =>
              task.name === updatedTask.name ? updatedTask : task
            ),
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
      boards: state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board
      ),
      initialData: updatedTask,
    };
  }),

  updateTaskPositions: (activeId, overId, newColumnId) => {
    set((state) => {
      const activeTask = state.activeBoard.columns.flatMap((column) =>
        column.tasks.filter((task) => task.name === activeId)
      )[0];

      const activeColumn = state.activeBoard.columns.find((column) =>
        column.tasks.includes(activeTask)
      );

      if (!activeTask || !activeColumn) {
        return state;
      }

      const overColumn = state.activeBoard.columns.find((column) =>
        column.name === newColumnId
      );

      if (!overColumn) {
        return state;
      }

      const activeTasks = activeColumn.tasks.filter((task) => task.name !== activeId);
      const overTasks = overColumn.tasks;
      const overIndex = overTasks.findIndex((task) => task.name === overId);

      console.log('activeTasks', activeTasks);
      console.log('overTasks', overTasks);
      console.log('overIndex', overIndex);

      if (activeColumn === overColumn) {
        // Move within the same column
        const newTasks = arrayMove(overTasks, overTasks.indexOf(activeTask), overIndex);
        const updatedActiveBoard = {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((column) =>
            column === activeColumn ? {...column, tasks: newTasks} : column
          ),
        };
        return {
          activeBoard: updatedActiveBoard,
          boards: state.boards.map((board) =>
            board.name === updatedActiveBoard.name ? updatedActiveBoard : board
          ),
        };
      } else {
        // Move to a different column
        // if overIndex is -1, it means the task is being moved to the end of the column
        const newTasks = overIndex === -1
          ? [...overTasks, activeTask]
          : [
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
          boards: state.boards.map((board) =>
            board.name === updatedActiveBoard.name ? updatedActiveBoard : board
          ),
        };
      }
    });
  },

  // Dark mode actions
  toggleDarkMode: () => set((state) => ({
    isDarkMode: !state.isDarkMode,
  })),

  // Modal actions
  activateModal: (modalType, initialData) => set(() => ({
    isModalOpen: true,
    modalType,
    initialData,
  })),

  closeModal: () => set(() => ({
    isModalOpen: false,
    modalType: '',
    initialData: {},
  })),

  // Side panel actions
  toggleSidePanel: () => set((state) => ({
    isSidePanelOpen: !state.isSidePanelOpen,
  })),
}));

export default useStore;
