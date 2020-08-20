const express = require("express");
const { uuid} = require("uuidv4");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// MIDDLEWARES
// function validateRepoId ( request, response, next){
//   const{id}=request.params

//   if(!isUuid(id)){
//       return response.status(400).json({error:'Repository Id Invalid'})
//   }

//   return next()
// }

// APPLYING MIDDLEWARES
// app.use('/repositories/:id', validateRepositoryId);
// app.use('/repositories/:id/like', validateRepositoryId);


// ROUTES
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
    
  const repository = {
    id:uuid(), 
    title, 
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const {title, url, techs} = request.body;


  let repository = repositories.find(repository => repository.id === id);
  if (!repository) {
    return response.status(400).json({ error: "Repository was not found."})
  }
  
  repository = {...repository, title, url, techs}

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if ( repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository was not found."})
  }
  repositories.splice(repositoryIndex, 1)
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(400).send();
  }
  
  repository.likes += 1;

  response.json(repository);
});

module.exports = app;
