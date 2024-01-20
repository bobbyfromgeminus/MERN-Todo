import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


// --- M O N G O D B  --------------------------------------------
  const mongoUser = 'mernuser';
  const mongoPw = 'nCunJZhHpoK34bCJ';
  mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPw}@clustermern.c1s1okf.mongodb.net/?retryWrites=true&w=majority`);

// --- C R U D  --------------------------------------------------

  // CREATE
  app.post('/todos', async (req, res) => {
    try {
      const todo = new Todo(req.body);
      await todo.save();
      res.status(201).send(todo);
      console.log(`[API ENDPOINT] ${new Date().toLocaleString()}: CREATE new Todo (POST)`);
    } catch (error) {
      res.status(400).send(error);
    }
  });


  // READ ALL
  app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.send(todos);
      console.log(`[API ENDPOINT] ${new Date().toLocaleString()}: GET all Todos (Get All)`);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // READ ONE
  app.get('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).send();
      }
      const prettyJson = JSON.stringify(todo, null, 2);
      res.type('json').status(200).send(prettyJson);
      console.log(`[API ENDPOINT] ${new Date().toLocaleString()}: GET one Todo (Get One)`);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // UPDATE
  app.patch('/todos/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'comment'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!todo) {
        return res.status(404).send();
      }

      res.send(todo);
      console.log(`[API ENDPOINT] ${new Date().toLocaleString()}: UPDATE a Todo (PATCH)`);
    } catch (error) {
      res.status(400).send(error);
    }
  });


  // DELETE
  app.delete('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).send();
      }
      res.send(todo);
      console.log(`[API ENDPOINT] ${new Date().toLocaleString()}: DELETE a Todo (DELETE)`);
    } catch (error) {
      res.status(500).send(error);
    }
  });


// --- S E R V E R   S T A R T  ----------------------------------

  app.listen(PORT, () => {
    console.log(`[SERVER STATE] ${new Date().toLocaleString()}: SERVER is running on port ${PORT}`);
  });