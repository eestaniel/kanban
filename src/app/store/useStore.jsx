import { create } from 'zustand';

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

  printBoard: () => console.log(get().state),

  getBoardAmount: () => Object.keys(get().boards).length,

  toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode})),

  activateModal: (modalType) => set(() => ({isModalOpen: true, modalType})),

  closeModal: () => set(() => ({isModalOpen: false, modalType: ''}))
}));

export default useStore;
