import { timeStamp } from "console";

const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please title your note."],
    },
    body: {
      type: String,
      require: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
