import {create} from 'zustand';


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
  boards: [], // list of objects with all boards containing columns, subtasks, etc.
  selectedBoard: null, // object of board selected by user to edit
  activeBoard: null, // object of the board currently being viewed main page

  // UI state
  isDarkMode: false,
  isModalOpen: false,

  // Modal state
  modalType: '',

  // unique id generator
  createUniqueId: (object_key) => {
    const generateId = () => Math.random().toString(36).substr(2, 9);
    // check if unique id already exists in either the board or column object
    let newId = generateId();
    while (Object.keys(object_key).includes(newId)) {
      newId = generateId();
    }
    return newId;
  },

  // Board actions
  createBoard: (newBoard) => set((state) => {
    // set active board to new board
    state.activeBoard = newBoard;
    console.log('active board set to:', state.activeBoard)
    // append newBoard object to boards array
    return {boards: [...state.boards, newBoard]};
  }),

  updateBoard: (board) => set((state) => {
    // find board in boards array and update it
    const updatedBoards = state.boards.map((b) => {
      if (b.board_id === board.board_id) {
        return board;
      }
      return b;
    });
    // update active board
    state.activeBoard = board;
    return {boards: updatedBoards};
  }),

  selectBoardToEdit: (board) => set(() => ({selectedBoard: board})),

  changeActiveBoard: (board) => set(() => ({activeBoard: board})),

  deleteBoard: (boardId) => set((state) => {
    const updatedBoards = state.boards.filter((board) => board.board_id !== boardId);
    // replace first board in list as active board, if empty set to null
    state.activeBoard = updatedBoards.length > 0 ? updatedBoards[0] : null;
    return {boards: updatedBoards};
  }),

  printBoard: () => console.log(get().boards),
  getBoardAmount: () => get().boards.length,

  // Dark mode actions
  toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode})),

  // Modal actions
  activateModal: (modalType) => set(() => ({isModalOpen: true, modalType})),
  closeModal: () => set(() => ({isModalOpen: false, modalType: ''}))
}));

export default useStore;
