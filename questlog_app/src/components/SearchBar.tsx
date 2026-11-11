type SearchBarProps = { value: string; onChange: (value: string) => void };

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search games
      </label>
      <input
        className="w-full md:w-64"
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
