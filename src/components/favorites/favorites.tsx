import React, {FC, useState} from 'react';
import {FavoritesWrapper} from './favorites.styled';
import {Movie} from "../../types/movie";
import MovieItem from "../movie-item/movie-item.lazy";
import {useSelector} from "react-redux";
import {selectFavoriteMovies} from "../../redux/selectors/favorites";
import {useNavigate} from "react-router-dom";

export interface FavoritesProps {
}

const Favorites: FC<FavoritesProps> = () => {
  const {movies} = useSelector(selectFavoriteMovies);
  const navigate = useNavigate();

  const handleMovieItemClick =  (movieID: number)=> {
    navigate(`/movies/${movieID}`);
  };

  return (
    <FavoritesWrapper>
      <>
        <div className={'d-grid movie-grid gap-5 px-2'}>
          {movies.length ? movies.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <div className="item" key={movie.id} /*onClick={(event) => handleMovieItemClick(movie.id)}*/>
                <MovieItem movie={movie}></MovieItem>
              </div>
            );
          }) : null}
        </div>
      </>
    </FavoritesWrapper>
  );
};

export default Favorites;
