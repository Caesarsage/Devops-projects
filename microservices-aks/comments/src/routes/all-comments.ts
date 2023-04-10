import express from 'express';

import { getAllComment } from '../controllers/all-comment';

const router = express.Router();

router.get('/api/comments', getAllComment);

export { router as getAllCommentRouter };