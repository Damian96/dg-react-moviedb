import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { SearchModalWrapper } from './search-modal.styled';
import { searchMovies } from "../../services/movies";
import { Movie, MovieResponse } from "../../types/movie";
import MovieItem from "../movie-item/movie-item.lazy";
// import { useNavigate } from "react-router-dom";

interface SearchModalProps {
}

const SearchModal: FC<SearchModalProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const searchModal = useRef<HTMLDivElement>(null);
  const movieGrid = useRef<HTMLDivElement>(null);
  const modalCloseBtn = useRef<HTMLButtonElement>(null);
  const searchInputContainer = useRef<HTMLDivElement>(null);
  /*
  const navigate = useNavigate();

  const handleMovieItemClick = (movieID: number) => {
    navigate('/movie/' + movieID);
  }*/

  const handleModalContentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!movieGrid.current?.contains(target) && !target.classList.contains('movie-grid') &&
      !searchInputContainer.current?.contains(target) && target.id !== 'input-container') {
      modalCloseBtn.current?.click();
    }
  }

  useEffect(() => {
    const movieNameRegex = /^[a-zA-Z0-9\s\-&',.()]+$/;

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

    if (searchModal.current) {
      searchModal.current.addEventListener('hidden.bs.modal', () => {
        setSearchResults([])
        setSearchTerm('')
      })
    }
  }, [searchTerm]);

  return (
    <SearchModalWrapper>
      <div id="searchModal" ref={searchModal} className="modal fade text-white" tabIndex={-1}
        aria-labelledby="searchModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content" onClick={((e) => handleModalContentClick(e))}>
            <div className={'modal-header border-0' + (!searchResults.length ? ' flex-grow-1 ' : '')}>
              <div className="container">
                <div id="input-container" ref={searchInputContainer} className="row">
                  <div className="col-12 col-lg-11 text-center">
                    <input type="text" placeholder="Search your favorite movie"
                      className="form-control"
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <div className="col-12 col-lg-1 d-flex align-items-center">
                    <button type="button" className="btn-close btn-close-white opacity-100" data-bs-dismiss="modal"
                      aria-label="Close" ref={modalCloseBtn}></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              {searchResults.length ?
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                    </div>
                  </div>
                  <div className={'d-grid movie-grid gap-5 px-2'} ref={movieGrid}>
                    {searchResults.map((movie) => {
                      if (!movie.poster_path) return null;
                      return (
                        <div className="col-auto" key={movie.id} /*onClick={handleMovieItemClick.bind(this, movie.id)}*/>
                          <MovieItem movie={movie}></MovieItem>
                        </div>
                      );
                    })}
                  </div>
                </div> : null}
            </div>
          </div>
        </div>
      </div>
    </SearchModalWrapper>
  )
};

export default SearchModal;
