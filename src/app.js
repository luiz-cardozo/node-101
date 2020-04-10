const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((repo) => repo.id === id);

  if (!repo) {
    return response.status(400).send();
  }

  const { title, url, techs } = request.body;

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  return response.json(repo);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex((repo) => repo.id === id);
  if (repoIndex < 0) {
    return res.status(400).send();
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;
  const repository = repositories.find((repo) => repo.id === id);
  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
