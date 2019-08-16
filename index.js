/** Bootcamp GoStack 6.0 - Rocketseat
 *  Desafio 01: Conceitos do NodeJS
 *  Desenvolvedor: Willian Nunes (willnunesjr@gmail.com)
 */

const express = require("express"); // Adicionando dependencia express ao projeto.
const server = express(); //Instanciando o Express.
server.use(express.json()); //Definindo modo de requisição.

// const projetcs = {
//   1: ["Nome do Projeto", ["Tarefa 1", "Tarefa 2"]]
// };

//console.log(projetcs["1"][1][0]);

const projects = [];
let count = 0;

//Middlewares

function logRequests(req, res, next) {
  count = count + 1;

  console.log(`Número de Requisições: ${count}`);

  next();
}

server.use(logRequests);

function checkIdInArray(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ message: "Project not found!" });
  }

  return next();
}

//Cadastrar Projetos
server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  //projects[id] = [title, [tasks]];

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//Listar Todos os Projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Alterar Nome do Projeto
server.put("/projects/:id", checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //projects[id][0] = title;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Deletar Projeto

server.delete("/projects/:id", checkIdInArray, (req, res) => {
  const { id } = req.params;

  //projects[id] = null;

  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

//Listar Tarefa de um Projeto

server.post("/projects/:id/tasks", checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  // projects[id][1][0].push(task);

  const project = projects.find(p => p.id == id);

  project.tasks.push(task);

  return res.json(project);
});

server.listen(3000);
