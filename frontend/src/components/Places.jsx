import Place from "./Place";

const Places = ({ places, onDelete, onEditPlace }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Places You've Visited
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
          {places.length} {places.length === 1 ? "Place" : "Places"}
        </span>
      </div>
      {places.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
          <p className="text-sm">
            No places found. Add one above to get started!
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {places.map((place) => (
            <Place
              place={place}
              key={place._id}
              onDelete={onDelete}
              onEditPlace={onEditPlace}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Places;
