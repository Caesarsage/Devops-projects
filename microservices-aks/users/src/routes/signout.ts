import express from 'express';

import { postSignout } from '../controllers/signout';

const router = express.Router();

router.post('/api/users/signout', postSignout);

export { router as signoutRouter };