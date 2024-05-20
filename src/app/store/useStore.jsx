import {create} from 'zustand';


const createUniqueId = (boards) => {
  const generateId = () => Math.random().toString(36).substr(2, 9);
  //get all board ids and check if the id already exists
  const boardIds = Object.keys(boards);
  let newId = generateId();
  while (boardIds.includes(newId)) {
    newId = generateId();
  }
  return newId;
}

const useStore = create((set, get) => ({
  /*boards: {
  *   board_id: {
  *     title: '',
  *     columns: {
  *       column_id: {
  *         title: '',
  *         description: '',
  *         subtasks: [],
  *         current_state: ''
  *     }
  *     */
  boards: {}, //object with all boards containing columns, subtasks, etc.
  selectedBoardId: null, // id of the board currently being viewed

  // UI state
  isDarkMode: false,
  isModalOpen: false,

  // Modal state
  modalType: '',

  // Board actions
  createBoard: (boardData) => set((state) => {
    const boardId = createUniqueId(state.boards);
    const newBoards = {...state.boards, [boardId]: {...boardData}};
    return {boards: newBoards};
  }),

  printBoard: () => console.log(get().boards),
  getBoardAmount: () => Object.keys(get().boards).length,

  // Dark mode actions
  toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode})),

  // Modal actions
  activateModal: (modalType) => set(() => ({isModalOpen: true, modalType})),
  closeModal: () => set(() => ({isModalOpen: false, modalType: ''}))
}));

export default useStore;
