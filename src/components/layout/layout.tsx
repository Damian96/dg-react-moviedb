import React, {FC, useRef} from 'react';
import {LayoutWrapper} from './layout.styled';
import {Link, Outlet} from "react-router-dom";
import SearchModal from "../SearchModal/SearchModal.lazy";
import {ThemeProvider} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

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
    }
  };

  const handleBackdropClick = () => {
    if (backdropRef.current && backdropRef.current.classList.contains('show')) handleToggleClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <div id="body" ref={bodypdRef}>
          <header ref={headerpdRef} className="header px-xl-2 bg-dark">
            <div className="container-fluid">

              <div className="row justify-content-start gap-lg-2">

                <div ref={toggleRef} className="header_toggle col-auto" onClick={handleToggleClick}>
                  <FontAwesomeIcon icon={faBars} color="white"/>
                </div>

                <Link to="/" className="col-auto me-xl-0 d-flex align-items-center">MyMovieDB</Link>
              </div>


            </div>
          </header>

          <div ref={navRef} className="l-navbar bg-dark" id="nav-bar">
            <nav className="nav">
              <ul className="d-flex flex-column flex-wrap list-unstyled">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page"
                    to={'/favorites'}>
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

            <div className="position-fixed search-btn btn btn-primary rounded-circle">
              <a href="#" title="Search" className="searchTrigger ms-auto d-flex align-items-center col-auto"
                   onClick={(e) => {
                     const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById('searchModal')!);
                     modal.show();
                   }}>
                  <i className="bi bi-search text-light lead"></i>
                  <span className="d-none" id="searchModalLabel">search</span>
                </a>
            </div>
          </main>


          <div ref={backdropRef} id="backdrop" className="position-fixed top-0 start-0" onClick={handleBackdropClick}></div>

        </div>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
