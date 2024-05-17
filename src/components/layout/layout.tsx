import React, {FC, useEffect, useRef, useState} from 'react';
import {LayoutWrapper} from './layout.styled';
import {Link, Outlet} from "react-router-dom";
import SearchModal from "../search-modal/search-modal.lazy";
import {ThemeProvider} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {selectShowToast, selectToastData} from "../../redux/selectors/modals";
import Toast from "../toast/toast.lazy";
import {ToastTheme} from "../toast/toast";
import {selectAuthMessage, selectErrorID, selectIsLoggedIn} from "../../redux/selectors/auth";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
}

const theme = {
  headerHeight: '3rem',
  navWidth: '200px',
  firstColor: '#4723D9',
  firstColorLight: '#AFA5D9',
  whiteColor: '#F7F6FB',
  normalFontSize: '1rem',
  zFixed: 100,
};

const Layout: FC<LayoutProps> = () => {

  const toggleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bodypdRef = useRef<HTMLDivElement>(null);
  const headerpdRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const handleToggleClick = () => {
    if (toggleRef.current && navRef.current && bodypdRef.current && headerpdRef.current
      && backdropRef.current) {
      // show backdrop
      backdropRef.current.classList.toggle('show');
      // show navbar
      navRef.current.classList.toggle("show");
      // change icon
      toggleRef.current.classList.toggle('bx-x');
      // add padding to body
      bodypdRef.current.classList.toggle('body-pd')
      // add padding to header
      headerpdRef.current.classList.toggle('body-pd')

      setNavbarExpanded(!navbarExpanded);
    }
  };

  const handleBackdropClick = () => {
    if (backdropRef.current && backdropRef.current.classList.contains('show')) handleToggleClick();
  };

  const handleSearchClick = () => {
    const searchModal = document.getElementById('searchModal')!;
    const modal = window.bootstrap.Modal.getOrCreateInstance(searchModal);
    modal.show();
  };

  const [showToast, setShowToast] = useState(useSelector(selectShowToast))
  const [toastMessage, setToastMessage] = useState(useSelector(selectToastData))
  const [toastTheme, setToastTheme] = useState<ToastTheme>('info');
  const [toastKey, setToastKey] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authMessage = useSelector(selectAuthMessage);
  const errorID = useSelector(selectErrorID);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && authMessage) {
      setShowToast(true);
      setToastMessage({message: authMessage});
      setToastTheme('info');
      setToastKey('bs_toast_' + errorID)
      navigate('/')
    } else if (!isLoggedIn && authMessage) {
      setShowToast(true);
      setToastMessage({message: authMessage});
      setToastTheme('danger');
      setToastKey('bs_toast_' + errorID)
    }
  }, [isLoggedIn, authMessage, errorID]);

  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <div id="body" ref={bodypdRef}>
          <header ref={headerpdRef} className="header px-xl-2 bg-dark">
            <div className="container-fluid">

              <div className="row justify-content-start gap-lg-2">
                <div ref={toggleRef} className="header_toggle col-auto" onClick={handleToggleClick}>
                  <FontAwesomeIcon icon={navbarExpanded ? faTimes : faBars} color="white"/>
                </div>
              </div>


            </div>
          </header>

          <div ref={navRef} className="l-navbar bg-dark" id="nav-bar">
            <nav className="nav">
              <ul className="d-flex flex-column flex-wrap list-unstyled">
                <li className="nav-item">
                  <Link to="/" className="nav-link tex-white">
                    <span className="nav-link-icon"><span className="bi bi-house"></span></span>
                    <span className="nav-link-text">MyMovieDB</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={'/favorites'}>
                    <span className="nav-link-icon"><span className="bi bi-heart"></span></span>
                    <span className="nav-link-text">Favorites</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <SearchModal></SearchModal>

          <main id="main" className="body-pd">
            <Outlet/>

            <button className="searchTrigger position-fixed search-btn btn btn-primary rounded-circle" title="Search"
                    onClick={handleSearchClick}>
              <i className="bi bi-search text-light lead"></i>
              <span className="d-none" id="searchModalLabel">search</span>
            </button>

          </main>


          <div ref={backdropRef} id="backdrop" className="position-fixed top-0 start-0" onClick={handleBackdropClick}></div>

          {showToast && toastMessage.message.trim().length ?
            <Toast body={toastMessage.message} key={toastKey}
                   theme={toastTheme}></Toast> : null}
        </div>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
