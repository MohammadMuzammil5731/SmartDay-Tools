import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ token, message: 'Login successful' });
  }
  
  res.status(401).json({ message: 'Invalid Admin Credentials' });
};
