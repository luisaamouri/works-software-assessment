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
router.get("/", createNote);

// delete note by ID
router.get("/:id", deleteNote);

// update note by ID
router.get("/:id", updateNote);

export default router;
