import CustomTextField from "@/app/components/textfiield/CustomTextField";
import {useState} from "react";

const CustomTextFieldList = ({label}) => {
  const columns = useState([]);

  return (
    <>
      <div className="textfield-container">
        <label className="label">{label}</label>
        <div className="input-wrapper">

        </div>
      </div>
    </>
  );
};

export default CustomTextFieldList;
