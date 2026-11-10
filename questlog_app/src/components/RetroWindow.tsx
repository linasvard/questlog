import type { ReactNode } from 'react';

type RetroWindowProps = {
  title: string;
  barColor?: string;
  className?: string;
  children: ReactNode;
};

const RetroWindow = ({
  title,
  barColor = 'bg-yellow',
  className = '',
  children,
}: RetroWindowProps) => {
  return (
    <article
      className={`flex h-full flex-col min-h-0 border-[3px] border-black bg-light text-black shadow ${className}`}>
      <div
        className={`flex items-center justify-between gap-2 border-b-[3px] border-black px-3 py-2 ${barColor}`}>
        <h2 className="truncate font-bold uppercase">{title}</h2>
        <div className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="size-3 border-2 border-dark-alt bg-green" />
          <span className="size-3 border-2 border-dark-alt bg-yellow" />
          <span className="size-3 border-2 border-dark-alt bg-red" />
        </div>
      </div>
      <div className="flex flex-1 min-h-0 flex-col gap-3 p-4">{children}</div>
    </article>
  );
};

export default RetroWindow;
