const fs = require('fs');
const path = require('path');

const librosPath = path.join(__dirname, '../data/libros.json');
const autoresPath = path.join(__dirname, '../data/autores.json');

const loadLibros = () => JSON.parse(fs.readFileSync(librosPath));
const saveLibros = (data) => fs.writeFileSync(librosPath, JSON.stringify(data, null, 2));
const loadAutores = () => JSON.parse(fs.readFileSync(autoresPath));

exports.getLibros = (req, res) => {
  res.json(loadLibros());
};

exports.getLibro = (req, res) => {
  const libros = loadLibros();
  const libro = libros.find(l => l.id === parseInt(req.params.id));

  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

  res.json(libro);
};

exports.createLibro = (req, res) => {
  const libros = loadLibros();
  const autores = loadAutores();

  if (!autores.some(a => a.id === req.body.autorId)) {
    return res.status(400).json({ error: "autorId inválido: el autor no existe" });
  }

  const nuevoLibro = {
    id: libros.length ? libros[libros.length - 1].id + 1 : 1,
    ...req.body
  };

  libros.push(nuevoLibro);
  saveLibros(libros);

  res.status(201).json(nuevoLibro);
};

exports.updateLibro = (req, res) => {
  const libros = loadLibros();
  const index = libros.findIndex(l => l.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Libro no encontrado" });

  if (req.body.autorId) {
    const autores = loadAutores();
    if (!autores.some(a => a.id === req.body.autorId)) {
      return res.status(400).json({ error: "autorId inválido: el autor no existe" });
    }
  }

  libros[index] = { ...libros[index], ...req.body };
  saveLibros(libros);

  res.json(libros[index]);
};

exports.deleteLibro = (req, res) => {
  const libros = loadLibros();
  const index = libros.findIndex(l => l.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Libro no encontrado" });

  const eliminado = libros.splice(index, 1);
  saveLibros(libros);

  res.json(eliminado[0]);
};

/**
 * Cruce de datos: obtener libros por autor
 */
exports.getLibrosPorAutor = (req, res) => {
  const autorId = parseInt(req.params.id);
  const libros = loadLibros();
  const autores = loadAutores();

  const autorExiste = autores.some(a => a.id === autorId);
  if (!autorExiste) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  const librosAutor = libros.filter(l => l.autorId === autorId);
  res.json(librosAutor);
};
