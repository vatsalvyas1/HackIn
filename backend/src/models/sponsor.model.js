import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a sponsor name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  website: {
    type: String,
    required: [true, 'Please add your website URL'],
  },
  logo: {
    type: String,
    required: [true, 'Please add a logo URL']
  },
  contactEmail: {
    type: String,
    required: [true, 'Please add a contact email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  tier: {
    type: String,
    enum: ['Platinum', 'Gold', 'Silver', 'Bronze'],
    default: 'Bronze'
  }
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);
export default Sponsor;