import Note from "../models/note.model";
import { Request, Response } from "express";

// get all notes
const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// get note by ID
const getSingleNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// update note by ID
const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, req.body);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updatedNote = await Note.findById(id);
    res.status(200).json(note);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// delete note by ID
const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note successfully deleted" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// create note
const createNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json(note);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export { getNotes, getSingleNote, updateNote, deleteNote, createNote };
