import express from 'express';
import { getStats, getDeviation } from '../controllers/cryptoController.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

export default router;
