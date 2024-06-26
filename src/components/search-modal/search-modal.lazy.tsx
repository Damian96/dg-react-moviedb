import React, { lazy, Suspense } from 'react';

const LazySearchModal = lazy(() => import('./search-modal'));

const SearchModal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySearchModal {...props} />
  </Suspense>
);

export default SearchModal;
