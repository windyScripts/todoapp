import {Router} from 'express';
import {addUser,login} from '../controllers/user-controller.js';

const router = Router();

// new user registration

router.post('/new', addUser);

// user login

router.post('/login', login);

export default router;