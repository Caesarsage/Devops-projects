import express from 'express';

const router = express.Router();

router.get('/api/users/healthcheck', (req, res) => {
    res.send('Hi, I am alive in user microservice');
});

export { router as healthcheckRouter };