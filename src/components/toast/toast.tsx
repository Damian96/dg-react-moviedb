import React, {FC, useEffect, useId, useRef} from 'react';
import {ToastWrapper} from './toast.styled';

export type ToastTheme = 'danger' | 'success' | 'info' | 'warning' | 'primary';

export interface ToastProps {
  body: string,
  theme?: ToastTheme
}

const Toast: FC<ToastProps> = ({body, theme = 'info'}) => {
  const toastID = useId();
  const toastRef = useRef<HTMLDivElement>(null);
  const toastText = ['danger', 'info'].includes(theme) ? 'white' : 'black';

  useEffect(() => {
    if (toastRef.current != null) {
      const timeout = setTimeout(() => {
        // @ts-ignore
        window.bootstrap.Toast.getOrCreateInstance(toastRef.current!).hide();
      }, 5000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [toastRef]);

  return (
    <ToastWrapper>
      <div id={toastID} ref={toastRef} className={'toast show my-toast position-fixed bg-' + theme + ' text-' + toastText}
           role="alert" aria-live="polite"
           aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">MyMovieDB</strong>
          {/*<small>1 min</small>*/}
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body" dangerouslySetInnerHTML={{__html: body}}></div>
      </div>
    </ToastWrapper>
  );
};

export default Toast;
