import './navbar.css';
import Image from 'next/image';
import Chevron_Down from '@/app/assets/icon-chevron-down.svg';
import Chevron_Up from '@/app/assets/icon-chevron-up.svg';
import CustomButton from "@/app/components/buttons/CustomButton";
import useStore from "@/app/store/useStore";
import { useState } from "react";
import Popover from "@/app/components/popover/Popover";
import Logo from '@/app/components/navbar/logo/Logo';


/**
 * Navbar component
 * THis component is responsible for rendering the top navigation bar
 * It also renders the logo and the board name
 * It also renders the add task button and the popover menu
 * @returns {JSX.Element}
 * */
const Navbar = () => {
  const { isModalOpen, modalType, activateModal, boards, activeBoard, isSidePanelOpen } = useStore((state) => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    activateModal: state.activateModal,
    boards: state.boards,
    activeBoard: state.activeBoard,
    isSidePanelOpen: state.isSidePanelOpen,
  }));

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleNavHeaderClick = () => {
    if (window.innerWidth < 768) {
      activateModal('board-select');
    }
  };

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className={`logo-group ${!isSidePanelOpen ? 'logo-group-bottom-border' : ''}`}>
          <Logo />
          <svg width="114" height="26" viewBox="0 0 114 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.56001 24.9999V19.6559L7.48001 17.5439L11.928 24.9999H17.368L11.064 14.5679L17.4 7.52788H11.48L5.56001 13.8319V0.775879H0.76001V24.9999H5.56001ZM24.92 25.3839C27.096 25.3839 28.8453 24.7119 30.168 23.3679V24.9999H34.648V13.4799C34.648 12.2212 34.3333 11.1172 33.704 10.1679C33.0747 9.21855 32.1947 8.47721 31.064 7.94388C29.9333 7.41055 28.632 7.14388 27.16 7.14388C25.304 7.14388 23.6773 7.57055 22.28 8.42388C20.8827 9.27721 19.928 10.4292 19.416 11.8799L23.256 13.7039C23.5547 12.9359 24.0293 12.3172 24.68 11.8479C25.3307 11.3785 26.0827 11.1439 26.936 11.1439C27.832 11.1439 28.5413 11.3679 29.064 11.8159C29.5867 12.2639 29.848 12.8185 29.848 13.4799V13.9599L25.016 14.7279C22.9253 15.0692 21.368 15.7199 20.344 16.6799C19.32 17.6399 18.808 18.8559 18.808 20.3279C18.808 21.9065 19.3573 23.1439 20.456 24.0399C21.5547 24.9359 23.0427 25.3839 24.92 25.3839ZM24.376 21.4159C24.7813 21.7145 25.2827 21.8639 25.88 21.8639C27.0747 21.8639 28.0347 21.4905 28.76 20.7439C29.4853 19.9972 29.848 19.0905 29.848 18.0239V17.4799L25.88 18.1839C25.1973 18.3119 24.6747 18.5305 24.312 18.8399C23.9493 19.1492 23.768 19.5919 23.768 20.1679C23.768 20.7012 23.9707 21.1172 24.376 21.4159ZM42.968 24.9999V14.7919C42.968 13.7892 43.2667 12.9839 43.864 12.3759C44.4613 11.7679 45.2293 11.4639 46.168 11.4639C47.1067 11.4639 47.8747 11.7679 48.472 12.3759C49.0693 12.9839 49.368 13.7892 49.368 14.7919V24.9999H54.168V13.7679C54.168 12.4452 53.8907 11.2879 53.336 10.2959C52.7813 9.30388 52.008 8.53055 51.016 7.97588C50.024 7.42121 48.8667 7.14388 47.544 7.14388C46.4347 7.14388 45.4533 7.35188 44.6 7.76788C43.7467 8.18388 43.096 8.81855 42.648 9.67188V7.52788H38.168V24.9999H42.968ZM71.704 24.1679C70.36 24.9785 68.8347 25.3839 67.128 25.3839C66.0613 25.3839 65.064 25.2079 64.136 24.8559C63.208 24.5039 62.4347 23.9972 61.816 23.3359V24.9999H57.336V0.775879H62.136V8.99988C63.3733 7.76255 65.048 7.14388 67.16 7.14388C68.824 7.14388 70.328 7.54921 71.672 8.35988C73.016 9.17055 74.0827 10.2639 74.872 11.6399C75.6613 13.0159 76.056 14.5572 76.056 16.2639C76.056 17.9492 75.6667 19.4852 74.888 20.8719C74.1093 22.2585 73.048 23.3572 71.704 24.1679ZM66.552 21.0639C65.2507 21.0639 64.1893 20.6212 63.368 19.7359C62.5467 18.8505 62.136 17.6932 62.136 16.2639C62.136 14.8559 62.5467 13.7039 63.368 12.8079C64.1893 11.9119 65.2507 11.4639 66.552 11.4639C67.8747 11.4639 68.9627 11.9172 69.816 12.8239C70.6693 13.7305 71.096 14.8772 71.096 16.2639C71.096 17.6719 70.6693 18.8239 69.816 19.7199C68.9627 20.6159 67.8747 21.0639 66.552 21.0639ZM89.528 23.3679C88.2053 24.7119 86.456 25.3839 84.28 25.3839C82.4027 25.3839 80.9147 24.9359 79.816 24.0399C78.7173 23.1439 78.168 21.9065 78.168 20.3279C78.168 18.8559 78.68 17.6399 79.704 16.6799C80.728 15.7199 82.2853 15.0692 84.376 14.7279L89.208 13.9599V13.4799C89.208 12.8185 88.9467 12.2639 88.424 11.8159C87.9013 11.3679 87.192 11.1439 86.296 11.1439C85.4427 11.1439 84.6907 11.3785 84.04 11.8479C83.3893 12.3172 82.9147 12.9359 82.616 13.7039L78.776 11.8799C79.288 10.4292 80.2427 9.27721 81.64 8.42388C83.0373 7.57055 84.664 7.14388 86.52 7.14388C87.992 7.14388 89.2933 7.41055 90.424 7.94388C91.5547 8.47721 92.4347 9.21855 93.064 10.1679C93.6933 11.1172 94.008 12.2212 94.008 13.4799V24.9999H89.528V23.3679ZM85.24 21.8639C84.6427 21.8639 84.1413 21.7145 83.736 21.4159C83.3307 21.1172 83.128 20.7012 83.128 20.1679C83.128 19.5919 83.3093 19.1492 83.672 18.8399C84.0347 18.5305 84.5573 18.3119 85.24 18.1839L89.208 17.4799V18.0239C89.208 19.0905 88.8453 19.9972 88.12 20.7439C87.3947 21.4905 86.4347 21.8639 85.24 21.8639ZM102.328 14.7919V24.9999H97.528V7.52788H102.008V9.67188C102.456 8.81855 103.107 8.18388 103.96 7.76788C104.813 7.35188 105.795 7.14388 106.904 7.14388C108.227 7.14388 109.384 7.42121 110.376 7.97588C111.368 8.53055 112.141 9.30388 112.696 10.2959C113.251 11.2879 113.528 12.4452 113.528 13.7679V24.9999H108.728V14.7919C108.728 13.7892 108.429 12.9839 107.832 12.3759C107.235 11.7679 106.467 11.4639 105.528 11.4639C104.589 11.4639 103.821 11.7679 103.224 12.3759C102.627 12.9839 102.328 13.7892 102.328 14.7919Z"
                  fill="#000112"
            />
          </svg>
        </div>
        <div className="navgroup-wrapper">
          <div className="navgroup-1">
            <Logo className={'mobile-component'} />
            <div className="nav-link-header-group heading-l" onClick={handleNavHeaderClick}>
              <h1 className="nav-header heading-l">
                {boards.length === 0 ? 'No Boards' : activeBoard?.name}
              </h1>
              <Image className="mobile-component"
                     src={(isModalOpen && modalType === 'board-select') ? Chevron_Up : Chevron_Down} alt="Chevron" />
            </div>
          </div>
          <div className="navgroup-2">
            <div className="add-task-container">
              <CustomButton
                label="add-task"
                type="primary-large"
                id="add_task"
                disabled={boards.length === 0 || !activeBoard?.columns?.length}
                onClick={() => activateModal('new-task')}
              />
            </div>
            <div className="popover-trigger" onClick={togglePopover}>
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </div>
          </div>
          {activeBoard &&
            <Popover isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} popoverType="nav-menu" />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
