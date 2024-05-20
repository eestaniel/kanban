import {create} from 'zustand';

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);


const useStore = create((set, get) => ({
  /*boards: [{
  *   board_id: '',
  *   board_data: {
  *     name: '',
  *     columns: [{
*         column_id: '',
  *       name: '',
  *       task_list: [{
  *         task_id: '',
  *         name: '',
  *         description: '',
  *         subtasks: [],
  *         status: ''
  *      }]
  *    }]
  * }]
  *
  *     */
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
  createBoard: (newBoard) => set((state) => ({
    boards: [...state.boards, newBoard],
    activeBoard: newBoard,
  })),

  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((board) =>
      board.board_id === updatedBoard.board_id ? updatedBoard : board
    ),
    activeBoard: updatedBoard,
  })),

  selectBoardToEdit: (board) => set(() => ({
    selectedBoard: board,
  })),

  changeActiveBoard: (board) => set(() => ({
    activeBoard: board,
  })),

  deleteBoard: (boardId) => set((state) => {
    const updatedBoards = state.boards.filter((board) => board.board_id !== boardId);
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.length > 0 ? updatedBoards[0] : null,
    };
  }),

  getBoardAmount: () => get().boards.length,

  // Dark mode actions
  toggleDarkMode: () => set((state) => ({
    isDarkMode: !state.isDarkMode,
  })),

  // Modal actions
  activateModal: (modalType) => set(() => ({
    isModalOpen: true,
    modalType,
  })),

  closeModal: () => set(() => ({
    isModalOpen: false,
    modalType: '',
  })),
}));

export default useStore;
