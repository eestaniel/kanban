"use client";

import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modal/Modal";
import "./page.css";
import {useEffect} from "react";
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";
import BoardContent from "@/app/components/boardcontent/BoardContent";

export default function Home() {
  const {isDarkMode, activateModal} = useStore((state) => ({
    isDarkMode: state.isDarkMode,
    activateModal: state.activateModal,
  }));

  const boardCount = useBoardCount();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

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
