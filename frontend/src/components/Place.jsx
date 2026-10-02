import { useState } from "react";
import { Link } from "react-router-dom";
import { deletePlaceById, editPlaceById } from "../api/places";
import Button from "./Button";
import Input from "./Input";

const Place = ({ place, onDelete, onEditPlace }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(place.name);

  const handleDelete = async () => {
    try {
      await deletePlaceById(place._id);
      onDelete(place._id);
    } catch (error) {
      console.error("Failed to delete place:", error);
    }
  };

  const handleEditBtnClick = () => setIsEditing(true);

  const handleCancelBtnClick = () => {
    setIsEditing(false);
    setEditName(place.name);
  };

  const handleEditInputChange = (e) => setEditName(e.target.value);

  const handleSaveBtnClick = async () => {
    if (!editName.trim()) return;

    try {
      const updatedPlace = await editPlaceById(editName, place._id);
      onEditPlace(updatedPlace);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating place", error);
    }
  };

  return (
    <li className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 list-none flex flex-col justify-between h-full">
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <Input
            label="Edit Data:"
            value={editName}
            onChange={handleEditInputChange}
            autoFocus
          ></Input>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <Button
              onClick={handleCancelBtnClick}
              variant="cancel"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBtnClick}
              variant="save"
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm">📍</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Destination
              </span>
            </div>
            <Link
              to={`/places/${place._id}`}
              className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors block truncate"
              title={place.name}
            >
              {place.name}
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button onClick={handleEditBtnClick} variant="edit">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="delete">
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default Place;
