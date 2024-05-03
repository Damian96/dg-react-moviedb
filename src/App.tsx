import React from 'react';
import './App.css';

import './styles/bootstrap/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import SearchModal from "./components/SearchModal/SearchModal.lazy";
import {Provider} from "react-redux";
import configurestore from "./redux/configurestore";

function App() {
  return (
    <Provider store={configurestore}>
      <div id="body">
        <header className="header px-xl-5 bg-dark">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand col-xl-2 col-xxl-1 me-xl-0" href="#">MyMovieDB</a>
              <button className="navbar-toggler" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" aria-expanded="false"
                      aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav col-xl-7 offset-xl-2 justify-content-xl-center me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page"
                       href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" title="Search" className="searchTrigger d-flex align-items-center h-100"
                       onClick={(e) => {
                         const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById('searchModal')!);
                         modal.show();
                       }}>
                      <i className="bi bi-search text-light lead"></i>
                      <span className="d-none" id="searchModalLabel">search</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <SearchModal></SearchModal>
      </div>
    </Provider>
  );
}

export default App;
