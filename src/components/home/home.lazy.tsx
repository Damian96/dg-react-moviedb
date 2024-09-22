import React, { lazy, Suspense } from 'react';

const Lazyhome = lazy(() => import('./home'));

const home = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazyhome {...props} />
  </Suspense>
);

export default home;
