import express from 'express';
import { serviceControllers } from './service.controller';

const router = express.Router();

// will call controller function
router.post('/', serviceControllers.createService);
router.get('/', serviceControllers.getAllServices);
router.get('/:id', serviceControllers.getSingleService);
router.put('/:id', serviceControllers.updateService);
router.delete('/:id', serviceControllers.deleteService);

export const ServicesRoutes = router;
