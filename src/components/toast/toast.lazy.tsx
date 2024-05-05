import React, { lazy, Suspense } from 'react';
import {ToastProps} from "./toast";

const LazyToast = lazy(() => import('./toast'));

const Toast = (props: ToastProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyToast {...props} />
  </Suspense>
);

export default Toast;
