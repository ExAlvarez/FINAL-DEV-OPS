const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autoresController');
const librosController = require('../controllers/librosController');

router.get('/', autoresController.getAutores);
router.get('/:id', autoresController.getAutor);
router.post('/', autoresController.createAutor);
router.put('/:id', autoresController.updateAutor);
router.patch('/:id', autoresController.updateAutor);
router.delete('/:id', autoresController.deleteAutor);

// Cruce de datos: libros por autor
router.get('/:id/libros', librosController.getLibrosPorAutor);

module.exports = router;

