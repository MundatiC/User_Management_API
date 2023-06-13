const express = require('express');
const { getAllUsers, home, signupUser, updateUser, deleteUser, getSingleUser,loginUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', home);
router.get('/users', getAllUsers);
router.post('/users', signupUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
router.get('/users/:userId', getSingleUser);
router.post('/login', loginUser);

module.exports = {
  router
};
