import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWikiDetails } from "../api/wiki";
import { getPlaceDetails } from "../api/places";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(false);
  const [wikiData, setWikiData] = useState(null);
  const [isWikiDataLoading, setIsWikiDataLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPageData = async () => {
      try {
        const data = await getPlaceDetails(id);
        if (isMounted) setPlace(data);

        try {
          const wikiDetails = await fetchWikiDetails(data.name);
          if (isMounted) setWikiData(wikiDetails);
        } catch (wikiError) {
          console.warn("Error fetching details from wikipedia:", wikiError);
        } finally {
          if (isMounted) setIsWikiDataLoading(false);
        }
      } catch (databaseError) {
        if (isMounted) {
          console.error(
            "Error fetching  details from database:",
            databaseError,
          );
          setError(true);
        }
      }
    };
    loadPageData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors w-fit"
        >
          <span>←</span> Back to All Places
        </Link>
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-1">Place Not Found</h2>
          <p className="text-sm text-rose-600">
            The requested destination could not be retrieved from the database.
          </p>
        </div>
      </div>
    );
  }

  if (!place)
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm animate-pulse">
        <p className="text-sm font-medium">Loading destination details...</p>
      </div>
    );

  return (
    <div>
      {/* Navigation Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors mb-4 w-fit"
      >
        <span>←</span> Back to All Places
      </Link>

      {/* Main Editorial Card */}
      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Title Header */}
        <header className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Destination Summary
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {place.name}
          </h2>
        </header>

        {/* Wikipedia Enrichment */}
        {isWikiDataLoading ? (
          <div className="py-6 text-slate-400 text-sm animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            Fetching data from Wikipedia...
          </div>
        ) : wikiData ? (
          <div className="space-y-4">
            {wikiData?.thumbnail?.source && (
              <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                <img
                  src={wikiData.thumbnail.source}
                  alt={place.name}
                  className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {wikiData?.description && (
              <p className="text-sm font-semibold text-slate-700">
                {wikiData.description}
              </p>
            )}

            {wikiData?.extract && (
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {wikiData.extract}
              </p>
            )}
          </div>
        ) : (
          <div className="py-4 text-slate-400 italic text-sm">
            No additional encyclopedia entries were found for this locale.
          </div>
        )}

        {/* Technical Metadata Footer */}
        <footer className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Database ID</span>
          <code className="font-mono bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
            {place._id}
          </code>
        </footer>
      </article>
    </div>
  );
};

export default PlaceDetails;
