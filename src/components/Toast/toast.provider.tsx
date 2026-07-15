import {
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type { 
  ToastItem, 
  ToastOptions, 
  ToastPosition, 
  ToastType 
} from './toast.types';

import Toast from './Toast/Toast';
import { ToastContext } from './toast.context';




const DEFAULT_DURATION = 5; 

interface ToastProviderProps {
  children: ReactNode;
  /** Corner of the screen the toasts stack in. Defaults to 'top-right'. */
  position?: ToastPosition;
  /** Oldest toasts are dropped once this many are on screen. Defaults to 5. */
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idCounter = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', options: ToastOptions = {}) => {
      const id = `toast-${Date.now()}-${idCounter.current++}`;

      const newToast: ToastItem = {
        id,
        type,
        message,
        title: options.title,
        duration: options.duration ?? DEFAULT_DURATION,
        closable: options.closable ?? true,
        action: options.action,
      };

      setToasts((prev) => {
        const next = [...prev, newToast];
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      return id;
    },
    [maxToasts]
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) => addToast(message, 'success', options),
    [addToast]
  );
  const error = useCallback(
    (message: string, options?: ToastOptions) => addToast(message, 'error', options),
    [addToast]
  );
  const warning = useCallback(
    (message: string, options?: ToastOptions) => addToast(message, 'warning', options),
    [addToast]
  );
  const info = useCallback(
    (message: string, options?: ToastOptions) => addToast(message, 'info', options),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <div className={`toast-container toast-container--${position}`}>
            {toasts.map((t) => (
              <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

