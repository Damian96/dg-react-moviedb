import React, {FC} from 'react';
import {MovieDetailWrapper} from './movie-detail.styled';
import {Movie} from "../../types/movie";

export interface MovieDetailProps {
  movie: Movie
}

const MovieDetail: FC<MovieDetailProps> = () => {
  return (
    <MovieDetailWrapper>
      Movie Details Works
    </MovieDetailWrapper>
  );
};

export default MovieDetail;
