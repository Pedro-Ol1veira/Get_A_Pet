const router = require('express').Router();
const userController = require('../controller/userController');
const verifyToken = require('../helpers/verify-token');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/checkuser', userController.checkUser);
router.get('/:id', userController.getUserById);
router.patch('/edit/:id', verifyToken, userController.editUser);


module.exports = router;