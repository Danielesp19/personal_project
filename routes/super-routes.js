const express = require("express");
const router = express.Router();
const superheroController = require("../controllers/superhero");

router.post('/new-superhero', superheroController.createSuperhero);
router.get('/', superheroController.getListSuper);
router.get('/:id', superheroController.getById);
router.patch('/:id', superheroController.editSuper);
router.delete('/:id', superheroController.deleteSuper);

module.exports = router;