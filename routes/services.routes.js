import express from 'express';
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from '../controllers/serviceController.js';

const router = express.Router();

// router.post('/', createService);
// router.get('/', getServices);

router.route('/').post(createService).get(getServices);

// router.get('/:id', getService);
// router.put('/:id', updateService);
// router.delete('/:id', deleteService);

router.route('/:id').get(getService).put(updateService).delete(deleteService);

export default router;
