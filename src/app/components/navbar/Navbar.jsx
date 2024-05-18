import './navbar.css'
import Logo_Mobile from '@/app/assets/logo-mobile.svg'
import Image from 'next/image'
import {useState} from "react";
import Chevron_Down from '@/app/assets/icon-chevron-down.svg'
import Chevron_Up from '@/app/assets/icon-chevron-up.svg'
import Modal from "@/app/components/modal/Modal";

const Navbar = ({isDarkMode, setIsDarkMode, toggleDarkMode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setShowModal(!showModal);
  };
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <Image src={Logo_Mobile} alt="Logo"/>
          </div>
          <div className="nav-link-header-group heading-l" onClick={() => toggleModal()}>
            <h1 className="nav-header heading-l">Platform Launch</h1>
            <Image src={isOpen ? Chevron_Up : Chevron_Down} alt="Chevron"/>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={showModal}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        close={() => setShowModal(false)}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
};

export default Navbar;
