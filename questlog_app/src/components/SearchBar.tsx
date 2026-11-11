type SearchBarProps = { value: string; onChange: (value: string) => void };

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search games
      </label>
      <input
        className="w-full border-[3px] border-black bg-light px-3 py-3 text-sm text-black shadow-[5px_5px_0_#000] md:w-64"
        id="search"
        type="text"
        placeholder="Search games..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
