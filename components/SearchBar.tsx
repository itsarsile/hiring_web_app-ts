export default function SearchBar({ searchQuery, setSearchQuery, searchFilter, setSearchFilter, onSearch }: any) {
    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        console.log(event)
        onSearch(searchQuery, searchFilter);
      }
    };
    const handleSearchClick = () => {
      onSearch(searchQuery, searchFilter);
      console.log(searchQuery)
      console.log(searchFilter)
    };
  
    return (
      <div className="max-w-7xl mx-auto">
        <div className="join mx-auto flex-wrap">
          <input
            type="text"
            className="join-item w-full md:w-screen flex-1 lg:w-[50rem] input input-bordered rounded-md"
            placeholder="Search by name..."
            value={searchQuery}
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            name="filter"
            id=""
            className="join-item w-[6.5rem] lg:w-[16.5rem] select select-bordered"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <option value="name">Sort by name</option>
            <option value="skill">Sort by skill</option>
            <option value="location">Sort by location</option>
            <option value="freelance">Sort by freelance</option>
            <option value="fulltime">Sort by fulltime</option>
          </select>
          <button className="btn bg-primary text-white join-item rounded-md" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    );
  }