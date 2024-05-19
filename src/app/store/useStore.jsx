import create from 'zustand';

const useStore = create((set, get) => ({
  boards: {},
  isDarkMode: false,
  isModalOpen: false,
  modalType: '',

  printBoard: () => console.log(get().state),

  getBoardAmount: () => Object.keys(get().boards).length,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  activateModal: (modalType) => set(() => ({ isModalOpen: true, modalType })),

  closeModal: () => set(() => ({ isModalOpen: false, modalType: '' }))
}));

export default useStore;
