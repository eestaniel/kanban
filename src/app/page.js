"use client";

import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modal/Modal";
import "./page.css";
import {useEffect} from "react";
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";
import BoardContent from "@/app/components/boardcontent/BoardContent";
import Data from "@/app/data.json";

export default function Home() {
  const {isDarkMode, activateModal, initializeBoard} = useStore((state) => ({
    isDarkMode: state.isDarkMode,
    activateModal: state.activateModal,
    initializeBoard: state.initializeBoard,
  }));

  const boardCount = useBoardCount();

  useEffect(() => {
    // Add dark mode class to body if dark mode is enabled
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initialize boards from data.json
    if (Data.boards) {
      console.log("initializing boards", Data.boards);
      initializeBoard(Data.boards);
    }
  }, [initializeBoard]);

  return (
    <main>
      <Navbar/>
      <div className="main-container">
        <div className="content-container">
          <BoardContent boardCount={boardCount} activateModal={activateModal}/>
        </div>
        <Modal/>
      </div>
    </main>
  );
}
