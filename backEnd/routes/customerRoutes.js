import express from 'express';
import { addCustomer, getAllCustomers, updateCustomer, deleteCustomer, getPublicCustomer } from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateCustomer } from '../middleware/validationMiddleware.js';

const router = express.Router();
router.post('/', protect, validateCustomer, addCustomer);
router.get('/', protect, getAllCustomers);
router.put('/:id', protect, validateCustomer, updateCustomer);
router.delete('/:id', protect, deleteCustomer);
router.get('/public/:regNo', getPublicCustomer);

export default router;
