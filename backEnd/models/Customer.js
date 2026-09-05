import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherName: { type: String, required: true },
  pob: { type: String, required: true },
  regDate: { type: String, required: true },
  unitName: { type: String, required: true },
  unitCode: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);
