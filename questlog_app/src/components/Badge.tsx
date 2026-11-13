import type { ReactNode } from 'react';

type BadgeProps = { children: ReactNode; color?: string; className?: string };

const Badge = ({
  children,
  color = 'bg-yellow',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 border-2 border-black px-2 py-0.5 font-bold text-md uppercase text-black ${color} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
