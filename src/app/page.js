"use client";

import CustomButton from "@/app/components/buttons/Custom_Button";
import SubtaskCheckbox from "@/app/components/subtask_checkbox/Subtask_Checkbox";
import Custom_TextField from "@/app/components/textfiield/Custom_TextField";
import Dropdown from "@/app/components/dropdown/Dropdown";
import Navbar from "@/app/components/navbar/Navbar";
import "./page.css";
import {useState} from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const boardData = {

  }

  const toggleDarkMode = (e) => {
    e.preventDefault()
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  }

  return (
    <main>
      <div className="main-container">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} toggleDarkMode={toggleDarkMode}/>
        <div className="content-container">
          <p>stuff here</p>
        </div>

      </div>

    </main>
  );
}
