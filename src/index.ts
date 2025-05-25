import express, { Request, Response } from "express";
import noteRoutes from "./routes/note.routes";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());

// routes
app.use("/api/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

mongoose
  .connect(
    "mongodb+srv://admin:adminDB@assessmentdb.foqd4ql.mongodb.net/Node-API?retryWrites=true&w=majority&appName=assessmentDB"
  )
  .then(() => {
    console.log("Connnected to assessmentDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed.");
  });
