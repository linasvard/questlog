type LoaderProps = { label?: string };

const BLOCKS = 10;

const Loader = ({ label = 'Loading...' }: LoaderProps) => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-16">
      <div
        aria-hidden="true"
        className="flex w-64 gap-1 border-[3px] border-light bg-dark p-1 shadow">
        {Array.from({ length: BLOCKS }).map((_, index) => (
          <span
            key={index}
            className="h-5 flex-1 animate-fill-block bg-yellow motion-reduce:animate-none"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
      <p className="font-pixel text-sm uppercase">{label}</p>
    </div>
  );
};

export default Loader;
