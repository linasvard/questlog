import { useEffect } from 'react';

type ToastProps = { message: string; onClose: () => void; bg?: string };

const Toast = ({ message, onClose, bg }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className={`fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-4 border-[3px] border-dark px-5 py-3 text-dark shadow md:left-auto ${bg || 'bg-green'}`}>
      <span className="font-pixel-2">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="btn-link-2 btn-sm">
        Close
      </button>
    </div>
  );
};

export default Toast;
