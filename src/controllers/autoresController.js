const fs = require('fs');
const path = require('path');

const autoresPath = path.join(__dirname, '../data/autores.json');

const loadAutores = () => JSON.parse(fs.readFileSync(autoresPath));
const saveAutores = (data) => fs.writeFileSync(autoresPath, JSON.stringify(data, null, 2));

exports.getAutores = (req, res) => {
  res.json(loadAutores());
};

exports.getAutor = (req, res) => {
  const autores = loadAutores();
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  res.json(autor);
};

exports.createAutor = (req, res) => {
  const autores = loadAutores();
  const nuevo = {
    id: autores.length ? autores[autores.length - 1].id + 1 : 1,
    ...req.body
  };
  autores.push(nuevo);
  saveAutores(autores);
  res.status(201).json(nuevo);
};

exports.updateAutor = (req, res) => {
  const autores = loadAutores();
  const index = autores.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Autor no encontrado" });
  autores[index] = { ...autores[index], ...req.body };
  saveAutores(autores);
  res.json(autores[index]);
};

exports.deleteAutor = (req, res) => {
  const autores = loadAutores();
  const index = autores.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Autor no encontrado" });
  const eliminado = autores.splice(index, 1);
  saveAutores(autores);
  res.json(eliminado[0]);
};

