const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Task API!');
});

app.post('/tasks', async (req, res) => {
const { title, color, completed } = req.body;
try {
  const newTask = await prisma.task.create({
    data: { title, color, completed },
  });
  res.status(201).json(newTask);
} catch (error) {
  res.status(500).json({ error: 'Unable to create task' });
}
});

app.get('/tasks', async (req,res) => {
  try {
    const tasks = await prisma.task.findMany(); 
    res.status(200).json(tasks); 
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
    try{
    const reqTask = await prisma.task.findFirst({
      where: { id: parseInt(id) }
    });
    res.status(200).send(reqTask);
  } catch (error) {
    console.error('Error fetching the task:', error.message);
    res.status(500).json({ error: 'Unable to fetch task' });
  }
})

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, color, completed },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Unable to update task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const patchedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed },
    });
    res.status(200).json(patchedTask);
  } catch (error) {
    console.error('Error updating completed status:', error.message);
    res.status(500).json({ error: 'Unable to update status' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).send(deletedTask);
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Unable to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
