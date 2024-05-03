import React, { lazy, Suspense } from 'react';
import {MovieItemProps} from "./movie-item";

const LazyMovieItem = lazy(() => import('./movie-item'));

// Define a fallback component to show while the MovieItem component is loading
const MovieItemFallback = () => {
  return <div>🌀 Loading...</div>;
};

const MovieItem = (props: MovieItemProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={<MovieItemFallback/>}>
    <LazyMovieItem {...props} />
  </Suspense>
);

export default MovieItem;
