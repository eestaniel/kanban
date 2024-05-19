"use client";

import CustomButton from "@/app/components/buttons/Custom_Button";
import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modal/Modal";
import "./page.css";
import {useEffect} from "react";
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";

export default function Home() {
  const {isDarkMode, activateModal} = useStore(state => ({
    isDarkMode: state.isDarkMode,
    activateModal: state.activateModal
  }))

  const boardCount = useBoardCount();


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);


  return (
    <main>
      <div className="main-container">
        <Navbar/>
        <div className="content-container">
          {/* Check if board data state is empty */}
          {boardCount === 0 ?
            <div className="empty-state-group">
              <h2 className="dashboard-header heading-l">No boards detected. Create a new board to get started!</h2>
              <CustomButton id={'new-column-btn'}
                            label={'Create New Board'}
                            type={'primary-large'}
                            onClick={() => activateModal('new-board')}
                            disabled={false}
              />
            </div>

            :
            ''
          }
        </div>
        <Modal/>
      </div>


    </main>


  );
}
