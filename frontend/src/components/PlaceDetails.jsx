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
          console.warn("Error fetching  details from wikipedia:", wikiError);
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
      <div>
        <div>
          <Link to="/">← Back to All Places</Link>
        </div>
        <h2>Place Not Found</h2>
        <p>The requested place could not be found in the database.</p>
      </div>
    );
  }

  if (!place)
    return (
      <div>
        <p>Loading details...</p>
      </div>
    );

  return (
    <div>
      <Link to="/">← Back to All Places</Link>
      <div>
        <h2>{place.name}</h2>
      </div>

      {isWikiDataLoading ? (
        <p>
          <em>Loading further details...</em>
        </p>
      ) : wikiData ? (
        <div>
          {wikiData?.thumbnail?.source && (
            <div>
              <img src={wikiData.thumbnail.source} alt={place.name} />
            </div>
          )}
          {wikiData?.description && (
            <p>
              <strong>{wikiData.description}</strong>
            </p>
          )}
          {wikiData?.extract && <p>{wikiData.extract}</p>}
        </div>
      ) : (
        <p>
          <em>No additional information found for this place.</em>
        </p>
      )}

      <div>
        <span>Database ID: </span>
        <span>{place._id}</span>
      </div>
    </div>
  );
};

export default PlaceDetails;
