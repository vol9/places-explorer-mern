/**
 * @param {string} placeName - User Input (e.g. "New York")
 * @returns {Promise<Object|null>} Wikipedia page summary or null on error
 */

export async function fetchWikiDetails(placeName) {
  if (!placeName) return null;

  try {
    const safeName = encodeURIComponent(placeName);
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${safeName}`,
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Wikipedia API network error:", error);
    return null;
  }
}
