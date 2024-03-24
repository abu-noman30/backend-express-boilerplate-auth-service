import express from 'express';
import { zodValidation } from '../../middlewares/zodValidation/zodValidation';
import { UserControllers } from './user.controller';
import { UserZodSchema } from './user.validation';

const router = express.Router();

router.get('/:id', UserControllers.getSingleUserController);
router.patch('/:id', UserControllers.updateUserController);
router.post('/create', zodValidation(UserZodSchema.createUserZodSchema), UserControllers.createUserController);
router.get('/all', UserControllers.getAllUserController);

export const UserRoute = router;
