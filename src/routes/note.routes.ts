const express = require("express");
const router = express.Router();
import {
  getNotes,
  getSingleNote,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller";

// get all notes
router.get("/", getNotes);

// get note by ID
router.get("/:id", getSingleNote);

// create note
router.post("/", createNote);

// delete note by ID
router.put("/:id", deleteNote);

// update note by ID
router.delete("/:id", updateNote);

export default router;
