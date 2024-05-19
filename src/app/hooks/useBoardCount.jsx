import useStore from "@/app/store/useStore";


export const useBoardCount = () => {
  return useStore(state => state.getBoardAmount());
}
