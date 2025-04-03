const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
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
  // Track tier per hackathon (if sponsorship levels vary)
  hackathons: [{
    hackathon: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hackathon',
      required: true
    },
    tier: {
      type: String,
      enum: ['Platinum', 'Gold', 'Silver', 'Bronze'],
      default: 'Bronze'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent duplicate sponsorships for the same hackathon
SponsorSchema.index({ user: 1, "hackathons.hackathon": 1 }, { unique: true });

module.exports = mongoose.model('Sponsor', SponsorSchema);