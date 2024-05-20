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
  selectedBoardId: null, // id of the board currently being viewed

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
    // append newBoard object to boards array
    return {boards: [...state.boards, newBoard]};
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
