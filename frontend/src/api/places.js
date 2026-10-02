const BASE_URL = "http://localhost:3000/api/places";

/**
 * sends a DELETE request to remove a place by ID
 * @param {string} id - the mongoDB _id of the place to delete
 * @return {Promise<boolean>} resolves to true on successful deletion
 */

export async function deletePlaceById(id) {
  if (!id) throw new Error("No place ID provided for deletion");

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete place. HTTP status: ${response.status}`);
  }

  return true;
}

/**
 * sends a PUT request to update a place's name by its mongoDB ID
 * @param {string} placeName - string containing the new name
 * @param {string} id - the mongoDB _id of the place to update
 * @return {Promise<Object>} returns the updated object from the database
 *
 */

export async function editPlaceById(placeName, id) {
  if (!id || !placeName?.trim()) {
    throw new Error("ID and a valid place name are required for the update.");
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: placeName.trim() }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update place. HTTP status: ${res.status}`);
  }

  return await res.json();
}

/**
 *sends a GET request to /api/places returning all places from mongoDB
 * @return {Promise<Array>Object>>} - returns array of objects from mongoDB
 */

export async function getPlaces() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch places. HTTP status: ${res.status}`);
  }
  return await res.json();
}

/**
 * sends a GET request to /api/places/ID returning details for that place_ID
 * @param {string} id - takes the ID of the place to show details page
 * @return {Promise<Object>} - returns the data for that object
 */

export async function getPlaceDetails(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok)
    throw new Error(
      `Failed to fetch place details! HTTP Status: ${res.status}`,
    );

  return await res.json();
}

/**
 * @param {string} placeData - the name of the place to create
 * @return{Promise<Object>} the newly created place object returned by the server
 */

export async function addNewPlace(placeName) {
  if (!placeName?.trim()) {
    throw new Error("A valid place name is required");
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: placeName.trim() }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create place! HTTP Status: ${res.status}`);
  }
  return await res.json();
}
