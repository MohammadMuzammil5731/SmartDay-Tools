import { body, validationResult } from 'express-validator';

export const validateCustomer = [
  body('regNo').notEmpty().withMessage('Registration Number is required'),
  body('name').notEmpty().withMessage('Customer Name is required').trim(),
  body('gender').notEmpty().withMessage('Gender selection is required'),
  body('dob').notEmpty().withMessage('Date of Birth is required'),
  body('motherName').notEmpty().withMessage("Mother's Name is required"),
  body('fatherName').notEmpty().withMessage("Father's Name is required"),
  body('pob').notEmpty().withMessage('Place of Birth is required'),
  body('regDate').notEmpty().withMessage('Registration Date is required'),
  body('unitName').notEmpty().withMessage('Registration Unit Name is required'),
  body('unitCode').notEmpty().withMessage('Registration Unit Code is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
