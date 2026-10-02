require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Place = require("./models/Place.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/places", async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Place name is required" });
  }
  try {
    const savedPlace = await Place.create({ name: name.trim() });
    res.status(201).json(savedPlace);
  } catch (error) {
    console.error("Error creating place:", error);
    res.status(500).json({ error: "Database error while saving place" });
  }
});

app.get("/api/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching place details" });
  }
});

app.put("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Place name is required" });
  }
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" },
    );
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: "Database error while updating place" });
  }
});

app.delete("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const placeToDelete = await Place.findByIdAndDelete(id);
    if (!placeToDelete) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json({ message: "Place deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Database error while deleting place" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`),
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
