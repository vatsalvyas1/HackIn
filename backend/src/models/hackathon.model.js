import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      location: {
          address : {
            type : String,
            required : true,
          },
          city : {
            type : String,
            required : true,
          },
          state : {
            type : String,
            required : true,
          },
          country : {
            type : String,
            required : true,
          },
          postalCode : {
            type : String,
            required : true,
          },
      },
      collegeRepresenting: {
        type: String,
        required: true,
      },
      colorTheme: {
        type: String,
      },
      mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'],
        required: true,
      },
      prizePool: {
        type: Number,
        default: 0,
      },
      registrationDeadline: {
        type: Date,
        required: true,
      },
      minTeamSize : {
        type : Number,
        required : true,
        min : 1,
      },
      maxTeamSize: {
        type: Number,
        required: true,
        min: 1,
      },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team', 
        },
      ],
      sponsors: [
        {
          name: String,
          logo: String, // URL to sponsor logo
        },
      ],
      website: {
        type: String,
      },
},{timestamps: true});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export default Hackathon;
