import express, {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.contoller.js';
import authenticate from '../middlewares/auth.middleware.js';

const router = Router();


router.get('/user', getUsers);
router.get('/user/:userId', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.put('/user/:userId', authenticate, updateUser);
router.delete('/user/:userId', authenticate, deleteUser);

export default router;