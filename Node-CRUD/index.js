const express = require("express");

const server = express();

server.use(express.json());

const cursos = ["Node JS", "JavaScript", "React Native", "React", "PHP"];

// Middleware Global
server.use((req, res, next) => {
  console.log(`URL Chamada: ${req.url}`);

  return next();
});

// Middleware Global
function checkCurso(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: "Nome do curso é obrigatório." });
  }

  return next();
};

// Middleware Global
function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];

  if(!curso) {
    return res.status(400).json({ error: "O usuário não existe." });
  }

  req.curso = curso;

  return next();
};

// Buscar ler os cursos
server.get("/cursos", (req, res) =>  {
  return res.json(cursos);
});

// Buscar curso ler
server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  return res.json(req.curso);
});

// Criar adicionar um novo curso
server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

// Update alterar um curso
server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

// Delete deletar algum curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json(cursos);
});

server.listen(3000);