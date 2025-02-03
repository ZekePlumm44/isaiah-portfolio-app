import { Router } from 'express';
import { getCurrentlyReading } from '../controllers/literalController';

const router = Router();

router.get('/currently-reading', getCurrentlyReading);

export default router;
