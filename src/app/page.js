"use client";

import CustomButton from "@/app/components/buttons/Custom_Button";
import SubtaskCheckbox from "@/app/components/subtask_checkbox/Subtask_Checkbox";
import Custom_TextField from "@/app/components/textfiield/Custom_TextField";
import "./page.css";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (e) => {
    e.preventDefault()
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      console.log("removing dark mode")
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  }

  return (
    <main>
      <div className="asd">Hello World</div>

      <div className="test-buttons">
        <CustomButton label={"Button Primary (L)"} type="primary-large"/>
        <CustomButton label={"Button Primary (S)"} type="primary-small"/>
        <CustomButton label={"Button Secondary"} type="secondary"/>
        <CustomButton label={"Button Destructive"} type="destructive"/>
        <CustomButton label={"Toggle Dark Mode"} type="primary-large" onClick={(e)=>toggleDarkMode(e)}/>
      </div>

      <div className="test-checkbox">
        <SubtaskCheckbox label={'Idle'} />
      </div>

      <div className="test-textfield">
        <Custom_TextField label={"Text Field (Idle)"} placeholder={"Enter task name"}/>
      </div>

    </main>
  );
}
