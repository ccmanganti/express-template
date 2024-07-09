const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get('/sample', (req, res) => {
  res.send('Hello, World!');
});

// POST route
app.post('/data', (req, res) => {
  const data = req.body;
  res.status(201).send(data);
});

// PUT route
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  res.send(`Updated item with ID ${id}: ${JSON.stringify(newData)}`);
});

// DELETE route
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Deleted item with ID ${id}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
