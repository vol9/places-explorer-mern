import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Places from "./components/Places";
import AddPlace from "./components/AddPlace";
import PlaceDetails from "./components/PlaceDetails";
import FilterForPlaces from "./components/FilterForPlaces";
import { getPlaces } from "./api/places";

function App() {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getPlaces();
        if (isMounted) setPlaces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        if (isMounted) setError(true);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddPlace = (newPlace) =>
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]);

  const handleDeletePlace = (id) =>
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));

  const handleUpdatePlace = (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place._id === updatedPlace._id ? updatedPlace : place,
      ),
    );
  };

  const filteredPlaces = (places || []).filter((place) =>
    place.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-xl max-w-md w-full text-center shadow-sm">
          <h2 className="text-lg font-semibold mb-1">
            Oops! Something weng wrong
          </h2>
          <p className="text-sm text-rose-600">
            Failed to load places. Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Places Explorer
          </h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col gap-6">
                <AddPlace onAddPlace={handleAddPlace} />
                <FilterForPlaces
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Places
                  places={filteredPlaces}
                  onDelete={handleDeletePlace}
                  onEditPlace={handleUpdatePlace}
                />
              </div>
            }
          />

          <Route path="/places/:id" element={<PlaceDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
