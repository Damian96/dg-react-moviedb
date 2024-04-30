import React, {FC, useEffect, useState} from 'react';
import {SearchModalWrapper} from './SearchModal.styled';
import {searchMovies} from "../../services/movies";
import {Movie, MovieResponse} from "../../types/movie";

interface SearchModalProps {
}

const SearchModal: FC<SearchModalProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const movieNameRegex = /^[a-zA-Z0-9\s\-&',.()]+$/;
  useEffect(() => {
    if (!searchTerm || !searchTerm.trim().length) return;

    if (!movieNameRegex.test(searchTerm)) return;

    searchMovies(searchTerm)
      .then((response) => {
        const data: MovieResponse = response.data as MovieResponse;

        if (!data.results.length) return;

        setSearchResults(data.results);
      })
      .catch((err) => {
        console.error('searchTerm error', err);
      })
  }, [searchTerm, movieNameRegex]);

  return (
    <SearchModalWrapper>
      <div id="searchModal" className="modal fade text-white" tabIndex={-1} aria-labelledby="searchModalLabel"
           aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header border-0">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-11 text-center">
                    <input type="text" placeholder="Search your favorite movie"
                           className="form-control"
                           value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  </div>
                  <div className="col-12 col-lg-1 d-flex align-items-center">
                    <button type="button" className="btn-close btn-close-white opacity-100" data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">

              <div className="container">
                <div className="row">
                  <div className="col-12">
                  </div>
                </div>
                <div className={'row gap-5 ' + (searchResults.length > 3 ? 'justify-content-between' : null)}>
                  {searchResults.length ? searchResults.map((movie) => {
                    return (
                      <a className="col-auto movie-poster" href="#" title={movie.title} key={movie.id}>
                        <img src={process.env.REACT_APP_TMDB_POSTERS_500 + movie.poster_path} alt={movie.title}
                             className="img-fluid"/>
                      </a>
                    );
                  }) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SearchModalWrapper>
  )
};

export default SearchModal;
