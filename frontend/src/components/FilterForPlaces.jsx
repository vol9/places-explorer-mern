import Input from "./Input";
const FilterForPlaces = ({ searchTerm, setSearchTerm }) => {
  const handleFilterInputChange = (e) => setSearchTerm(e.target.value);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <Input
        label="Filter places:"
        value={searchTerm}
        onChange={handleFilterInputChange}
        placeholder="Search places by name..."
      ></Input>
    </div>
  );
};

export default FilterForPlaces;
