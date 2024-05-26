const router = require('express').Router();
const petController = require('../controller/petsController');
const veriftToken = require('../helpers/verify-token');
const {imageUpload} = require('../helpers/image-upload');

router.post('/create', veriftToken, imageUpload.array('images'), petController.create);
router.get('/', petController.getAll);
router.get('/mypets', veriftToken, petController.getAllUserPets);
router.get('/myadoptions', veriftToken, petController.getAllUserAdoptions);
router.get('/:id', petController.getPetById);
router.delete('/:id', veriftToken, petController.removePetById);
router.patch('/:id', veriftToken, imageUpload.array('images'), petController.updatePet);
router.patch('/schedule/:id', veriftToken,  petController.schedule);
router.patch('/conclude/:id', veriftToken,  petController.concludeAdoption);

module.exports = router;