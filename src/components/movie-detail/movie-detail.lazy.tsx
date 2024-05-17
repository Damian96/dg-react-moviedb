import React, {lazy, Suspense, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {getMovieById} from "../../services/movies";
import {Movie} from "../../types/movie";

const LazyMovieDetail = lazy(() => import('./movie-detail'));

const MovieDetail = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => {
  const {id} = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getMovieById(id)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError('Something went wrong while fetching the movie');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Suspense fallback={'Loading...'}>
      {movie && <LazyMovieDetail {...props} movie={movie}/>}
    </Suspense>
  );
};

export default MovieDetail;
