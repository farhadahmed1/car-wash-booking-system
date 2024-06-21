import express from 'express';
import { serviceControllers } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { slotController } from '../slot/slot.controller';
import { SlotValidation } from '../slot/slot.validation';

const router = express.Router();

// will call controller function
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createServiceValidationSchema),
  serviceControllers.createService,
);
router.get('/', serviceControllers.getAllServices);
router.get('/:id', serviceControllers.getSingleService);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  serviceControllers.updateService,
);
router.delete('/:id', serviceControllers.deleteService);

router.post(
  '/slots',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.createSlotValidationSchema),
  slotController.createSlot,
);

export const ServicesRoutes = router;
