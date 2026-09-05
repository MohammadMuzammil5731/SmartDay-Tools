import Customer from '../models/Customer.js';
export const addCustomer = async (req, res) => {
  try {
    // Check karenge ki kya registration number pehle se database me hai
    const existing = await Customer.findOne({ regNo: req.body.regNo });
    if (existing) {
      // Agar pehle se hai to hum user ko details ke sath strictly return karenge
      return res.status(400).json({ 
        message: 'This data is already saved in the database!', 
        regNo: existing.regNo 
      });
    }
    
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: 'Customer added successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Customer updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getPublicCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ regNo: req.params.regNo });
    if (!customer) return res.status(404).json({ message: 'Customer Record Not Found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
