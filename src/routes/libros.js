const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');
const autoresController = require('../controllers/autoresController');

router.get('/', librosController.getLibros);
router.get('/:id', librosController.getLibro);
router.post('/', librosController.createLibro);
router.put('/:id', librosController.updateLibro);
router.patch('/:id', librosController.updateLibro);
router.delete('/:id', librosController.deleteLibro);

// Cruce de datos: libros por autor
router.get('/autor/:id', librosController.getLibrosPorAutor);

module.exports = router;
