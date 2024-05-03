import React, {FC} from 'react';
import {MovieItemWrapper} from './movie-item.styled';
import {Movie} from "../../types/movie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export interface MovieItemProps {
  movie: Movie
}

const MovieItem: FC<MovieItemProps> = ({movie}) => {
  return (
    <MovieItemWrapper>
      <div className="item position-relative" title={movie.title}>
        <img src={process.env.REACT_APP_TMDB_POSTERS_500 + movie.poster_path} alt={movie.title}
             className="img-fluid"/>
        <div className="item-actions">
          <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
        </div>
      </div>
    </MovieItemWrapper>
  );
};

export default MovieItem;
