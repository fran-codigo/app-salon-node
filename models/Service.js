import mongoose from 'mongoose';

const servicesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
});

const Service = mongoose.model('Services', servicesSchema);
export default Service;
