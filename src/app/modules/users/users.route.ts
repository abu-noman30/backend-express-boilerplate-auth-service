import express from 'express';
import { UserControllers } from './users.controller';

const router = express.Router();

router.post('/create', UserControllers.createUserController);

export const UserRoute = router;
