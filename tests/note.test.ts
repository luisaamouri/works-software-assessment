import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import Note from '../src/models/note.model';
import noteRoutes from '../src/routes/note.routes'; // Adjust path

const app = express();
app.use(express.json());
app.use('/api/notes', noteRoutes);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Note.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /api/notes', () => {
  it('should create a note with valid data', async () => {
    const res = await request(app).post('/api/notes').send({
      title: 'Test Note',
      body: 'Body text',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Note');
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/api/notes').send({
      body: 'Missing title',
    });

    expect(res.status).toBe(400); 
    expect(res.body).toHaveProperty('message');
  });

});

describe('GET /api/notes', () => {
  it('should return a list of all notes', async () => {
    const res = await request(app).get('/api/notes');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

});

describe('GET /api/notes/:id', () => {
  it('should return note with given id', async () => {
    const idNoteRes = await request(app).post('/api/notes').send({
      title: 'Test Note with ID',
      body: 'Body text',
    });

    const id = idNoteRes.body._id;

    const res = await request(app).get(`/api/notes/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Note with ID');
  });

  it('should return 400 with error message for invalid ID format', async () => {
    const id = "meow";
  
    const res = await request(app).get(`/api/notes/${id}`);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch('Invalid ID format');
  });

  it('should return 404 for a note ID that does not exist', async () => {

    const id = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/notes/${id}`);
  
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});

describe('DELETE /api/notes/:id', () => {
  it('should return note with given id', async () => {

    const idNoteRes = await request(app).post('/api/notes').send({
      title: 'Test Note with ID',
      body: 'Body text',
    });
    const id = idNoteRes.body._id;
    const res = await request(app).delete(`/api/notes/${id}`);

    expect(res.status).toBe(200);
  });

  it('should return 404 not found for non existent ID', async () => {

    const id = new mongoose.Types.ObjectId().toString();
    const res = await request(app).delete(`/api/notes/${id}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it('should return 404 not found for non existent ID', async () => {

    const id = "meow";
    const res = await request(app).delete(`/api/notes/${id}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch('Invalid ID format');
  });
});