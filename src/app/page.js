"use client";

import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modal/Modal";
import "./page.css";
import {useEffect} from "react";
import useStore from "@/app/store/useStore";
import BoardContent from "@/app/components/boardcontent/BoardContent";
import Data from "@/app/data.json";

export default function Home() {
  const {isDarkMode, activateModal, initializeBoard, boards} = useStore((state) => ({
    isDarkMode: state.isDarkMode,
    activateModal: state.activateModal,
    initializeBoard: state.initializeBoard,
    boards: state.boards,
  }));


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
      initializeBoard(Data.boards);
    }
  }, [initializeBoard]);

  useEffect(() => {
    // Initialize boards from data.json
    if(boards) {
    }
  }, [boards]);

  return (
    <main>
      <Navbar/>
      <div className="main-container">
        <div className="content-container">
          <BoardContent boardCount={Object.keys(boards)?.length} activateModal={activateModal}/>
        </div>
        <Modal/>
      </div>
    </main>
  );
}
