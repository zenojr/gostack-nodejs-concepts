const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  console.log(title, url, techs);
  const repository ={ id: uuid(), 
                      title, 
                      url, 
                      techs, 
                      likes: 0
                    }
  repositories.push(repository)
  console.log(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } =  request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex( repository => repository.id == id );

  if (repositoryIndex == -1 ){
    return response.status(400).json({ erro: "Repository does not exists." });
  }

  const repository = {
    id, 
    title, 
    url, 
    techs, 
    likes: repositories[repositoryIndex].likes };

  repositories[repositoryIndex] = repository

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex( repository => repository.id == id );
  if( repositoryIndex === -1 ){
    return response.status(400).json({ erro: "Repository not found" });
  } else {
    repositories.splice(repositoryIndex);
  }
  
  return response.status(204).send();
  

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex( repository => repository.id == id );
  if( repositoryIndex === -1 ){
    return response.status(400).json({ erro: "Repository not found" });
  } else {
    repositories[repositoryIndex].likes++;
  }
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
