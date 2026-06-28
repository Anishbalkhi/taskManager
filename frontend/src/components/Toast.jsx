import React, { useState, useEffect, useCallback } from 'react';

function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div className={`toast toast--${toast.type} ${exiting ? 'toast--exiting' : ''}`}>
      <span>{toast.message}</span>
    </div>
  );
}

function Toast({ toasts, removeToast }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={removeToast} />)}
    </div>
  );
}

export default Toast;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
