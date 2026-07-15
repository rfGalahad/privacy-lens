import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ToastItem } from '../toast.types';

import './Toast.css'

interface ToastProps {
  toast: ToastItem;
  onClose: () => void;
}

const ICONS: Record<string, React.ReactNode> = {
  success: <CheckCircle2 size={18} strokeWidth={2.5} />,
  error: <XCircle size={18} strokeWidth={2.5} />,
  warning: <AlertTriangle size={18} strokeWidth={2.5} />,
  info: <Info size={18} strokeWidth={2.5} />,
};

export default function Toast({ toast, onClose }: ToastProps) {
  
  const { type, message, title, duration = 5, closable = true, action } = toast;

  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingMsRef = useRef(duration * 1000);
  const startedAtRef = useRef(0);

  const handleClose = () => {
    setIsExiting(true);
    // wait for the exit animation before actually unmounting
    setTimeout(onClose, 200);
  };

  const startTimer = () => {
    if (duration <= 0) return; // 0 = persistent, no auto-dismiss
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(handleClose, remainingMsRef.current);
  };

  const pauseTimer = () => {
    if (duration <= 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    remainingMsRef.current -= Date.now() - startedAtRef.current;
    setIsPaused(true);
  };

  const resumeTimer = () => {
    if (duration <= 0) return;
    setIsPaused(false);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`toast toast--${type}${isExiting ? ' toast--exiting' : ''}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className="toast__icon" aria-hidden="true">
        {ICONS[type]}
      </div>

      <div className="toast__content">
        {title && <div className="toast__title">{title}</div>}
        <div className="toast__message">{message}</div>

        {action && (
          <button
            type="button"
            className="toast__action"
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {closable && (
        <button
          type="button"
          className="toast__close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      )}

      {duration > 0 && (
        <div
          className="toast__progress"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        />
      )}
    </div>
  );
}