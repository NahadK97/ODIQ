const MultiFilter = ({ filters, selectedFilters, setSelectedFilters }) => {
  const handleFilterClick = (type) => {
    if (selectedFilters.includes(type)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== type));
    } else {
      setSelectedFilters([...selectedFilters, type]);
    }
  };

  return (
    <div className="buttons-container">
      {filters.map((type, idx) => (
        <button
          key={`filter-${idx}`}
          onClick={() => handleFilterClick(type)}
          className={`button ${selectedFilters.includes(type) ? "active" : ""}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default MultiFilter;
