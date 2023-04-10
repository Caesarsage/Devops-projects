import express from 'express';

import { getAllPost } from '../controllers/all-post';

const router = express.Router();

router.get('/api/posts', getAllPost);

export { router as getAllPostRouter };