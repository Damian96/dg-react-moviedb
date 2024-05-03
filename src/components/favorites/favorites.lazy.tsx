import React, {lazy, Suspense} from 'react';
import {FavoritesProps} from "./favorites";

const LazyFavorites = lazy(() => import('./favorites'));

const Favorites = (props: FavoritesProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={'Loading Favorites...'}>
    <LazyFavorites {...props} />
  </Suspense>
);

export default Favorites;
