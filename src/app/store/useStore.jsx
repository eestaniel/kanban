import {create} from 'zustand';

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

const arrayMove = (array, from, to) => {
  const newArray = [...array];
  const [element] = newArray.splice(from, 1);
  newArray.splice(to, 0, element);
  return newArray;

}

/**
 * Zustand store to manage the application state
 * @returns {Object} - Store object with state variables and actions
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
  activeTask: null,



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

        // handle the case where the task status is changed
        if (oldStatus !== newStatus) {
          const updatedSourceTasks = state.activeBoard.columns
            .find((column) => column.name === oldStatus)
            .tasks.filter((task) => task.name !== updatedTask.name);

          const updatedDestinationTasks = state.activeBoard.columns
            .find((column) => column.name === newStatus)
            .tasks;

          updatedActiveBoard = {
            ...state.activeBoard,
            columns: state.activeBoard.columns.map((column) => {
              if (column.name === oldStatus) {
                return {
                  ...column,
                  tasks: updatedSourceTasks,
                };
              }
              if (column.name === newStatus) {
                return {
                  ...column,
                  tasks: [...updatedDestinationTasks, updatedTask],
                };
              }
              return column;
            }),
          };
        }

        // handle the case where the task status is not changed
        else {
          updatedActiveBoard = {
            ...state.activeBoard,
            columns: state.activeBoard.columns.map((column) => ({
              ...column,
              tasks: column.tasks.map((task) => task.name === updatedTask.name ? updatedTask : task),
            })),
          };
        }

        break;

      default:
        return state;
    }
    console.log(updatedActiveBoard)

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
      initialData: updatedTask,
    };
  }),

  updateTaskPositions: (activeId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) => set((state) => {
    const activeTask = state.activeBoard.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.name === activeId);

    let updatedActiveBoard = null

    // handle the case where the task is moved within the same column and the same index
    if (sourceColumnId === destinationColumnId && sourceIndex === destinationIndex) {
      return {activeBoard: state.activeBoard};
    }
    // handle the case where the task is moved within the same column but to a different index
    else if (sourceColumnId === destinationColumnId) {
      const updatedTasks = arrayMove(
        state.activeBoard.columns.find((column) => column.name === sourceColumnId).tasks,
        sourceIndex,
        destinationIndex
      );
      updatedActiveBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => {
          if (column.name === sourceColumnId) {
            return {
              ...column,
              tasks: updatedTasks,
            };
          }
          return column;
        }),
      };
    }
    // handle the case where the task is moved to a different column
    else {
      const updatedSourceTasks = state.activeBoard.columns
        .find((column) => column.name === sourceColumnId)
        .tasks.filter((task) => task.name !== activeId);

      const updatedDestinationTasks = state.activeBoard.columns
        .find((column) => column.name === destinationColumnId)
        .tasks;

      updatedActiveBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => {
          if (column.name === sourceColumnId) {
            return {
              ...column,
              tasks: updatedSourceTasks,
            };
          }
          if (column.name === destinationColumnId) {
            return {
              ...column,
              tasks: [
                ...updatedDestinationTasks.slice(0, destinationIndex),
                activeTask,
                ...updatedDestinationTasks.slice(destinationIndex),
              ],
            };
          }
          return column;
        }),
      };
    }

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) =>
        board.name === updatedActiveBoard.name ? updatedActiveBoard : board
      ),
    };
  }),

  // delete task by task name
  deleteTask: (taskName) => set((state) => {
    const updatedColumns = state.activeBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.name !== taskName),
    }));

    const updatedActiveBoard = {
      ...state.activeBoard,
      columns: updatedColumns,
    };

    return {
      activeBoard: updatedActiveBoard,
      boards: state.boards.map((board) => board.name === updatedActiveBoard.name ? updatedActiveBoard : board),
    };
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
