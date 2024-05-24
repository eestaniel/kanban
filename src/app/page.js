"use client";

import Navbar from "@/app/components/navbar/Navbar";
import SideNav from "@/app/components/navbar/SideNav";
import Modal from "@/app/components/modal/Modal";
import "./page.css";
import {useEffect, useRef} from "react";
import useStore from "@/app/store/useStore";
import BoardContent from "@/app/components/boardcontent/BoardContent";
import Data from "@/app/data.json";

export default function Home() {
  const {isDarkMode, activateModal, initializeBoard, boards, isSidePanelOpen, toggleSidePanel} = useStore((state) => ({
    isDarkMode: state.isDarkMode,
    activateModal: state.activateModal,
    initializeBoard: state.initializeBoard,
    boards: state.boards,
    isSidePanelOpen: state.isSidePanelOpen,
    toggleSidePanel: state.toggleSidePanel,
  }));

  const contentWrapperRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
    const contentWrapper = contentWrapperRef.current;

    const handleMouseDown = (e) => {
      // if e.target conatins a div that has a class of task-card, return
      const validClasses = ['task-list-group', 'columns-container', 'column-card'];
      if (!validClasses.some(cls => e.target.classList.contains(cls))) return;
      isDragging.current = true;
      startX.current = e.pageX - contentWrapper.offsetLeft;
      scrollLeft.current = contentWrapper.scrollLeft;
      contentWrapper.style.cursor = "grabbing";
      contentWrapper.style.userSelect = "none";
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - contentWrapper.offsetLeft;
      const walk = (x - startX.current) * 2; // Scroll-fast horizontally
      contentWrapper.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      contentWrapper.style.cursor = "all-scroll";
      contentWrapper.style.userSelect = "auto";
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      contentWrapper.style.cursor = "all-scroll";
      contentWrapper.style.userSelect = "auto";
    };

    const handleWindowMouseUp = () => {
      isDragging.current = false;
      contentWrapper.style.cursor = "all-scroll";
      contentWrapper.style.userSelect = "auto";
    };

    contentWrapper.addEventListener("mousedown", handleMouseDown);
    contentWrapper.addEventListener("mousemove", handleMouseMove);
    contentWrapper.addEventListener("mouseup", handleMouseUp);
    contentWrapper.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      contentWrapper.removeEventListener("mousedown", handleMouseDown);
      contentWrapper.removeEventListener("mousemove", handleMouseMove);
      contentWrapper.removeEventListener("mouseup", handleMouseUp);
      contentWrapper.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  return (
    <main>
      <Navbar/>
      {!isSidePanelOpen && (
        <div className="show-side-panel" onClick={() => toggleSidePanel()}>
          <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
              fill="#FFF"
            />
          </svg>
        </div>
      )}
      <div className="main-container">
        <SideNav/>
        <div className="content-wrapper" ref={contentWrapperRef}>
          <BoardContent boardCount={Object.keys(boards)?.length} activateModal={activateModal}/>
          <Modal/>
        </div>
      </div>
    </main>
  );
}
