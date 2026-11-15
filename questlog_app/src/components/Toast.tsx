import { useEffect, useState } from 'react';

type ToastProps = { message: string; onClose: () => void; bg?: string };

const FADE_DURATION = 300;
const VISIBLIE_DURATION = 3000;

const Toast = ({ message, onClose, bg }: ToastProps) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLeaving(true),
      VISIBLIE_DURATION - FADE_DURATION,
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLeaving) return;
    const timer = setTimeout(onClose, FADE_DURATION);
    return () => clearTimeout(timer);
  }, [isLeaving, onClose]);

  return (
    <div
      role="status"
      className={`fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-4 border-[3px] border-dark px-5 py-3 text-dark shadow animate-slide-in transition-opacity duration-300 motion-reduce:animate-none motion-reduce:transition-none md:left-auto ${bg || 'bg-green'} ${
        isLeaving ? 'opacity-0' : 'opacity-100'
      }`}>
      <span className="font-pixel-2">{message}</span>
      <button
        type="button"
        onClick={() => setIsLeaving(true)}
        aria-label="Close notification"
        className="btn-link-2 btn-sm">
        Close
      </button>
    </div>
  );
};

export default Toast;
