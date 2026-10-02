import { useState } from "react";
import { addNewPlace } from "../api/places";
import Button from "./Button";
import Input from "./Input";

const AddPlace = ({ onAddPlace }) => {
  const [newPlace, setNewPlace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => setNewPlace(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = newPlace.trim();
    if (!trimmedName) return;

    setIsSubmitting(true);

    try {
      const addedPlace = await addNewPlace(trimmedName);
      onAddPlace(addedPlace);
      setNewPlace("");
    } catch (err) {
      console.error("Failed to add place:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-shadow-slate-800 mb-4">
        Add a New Place
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="w-full flex-1">
          <Input
            label="Been Somewhere New?"
            value={newPlace}
            onChange={handleInputChange}
            placeholder="Enter city name..."
            disabled={isSubmitting}
          ></Input>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !newPlace.trim()}
          variant="save"
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Adding..." : "Add Place"}
        </Button>
      </form>
    </div>
  );
};

export default AddPlace;
