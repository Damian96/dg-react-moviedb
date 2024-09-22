import { FC } from 'react';
import { Movie } from "../../types/movie";
import { MovieDetailWrapper } from './movie-detail.styled';

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
