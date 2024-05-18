"use client";

import CustomButton from "@/app/components/Custom_Button";
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

    </main>
  );
}
