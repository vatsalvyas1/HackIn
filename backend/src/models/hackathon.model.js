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
          },
          city : {
            type : String,
          },
          state : {
            type : String,
          },
          country : {
            type : String,
          },
          postalCode : {
            type : String,
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
      prizes : {
        first : {
          type : Number,
        },
        second : {
          type : Number
        },
        third : {
          type : Number
        }
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
      applications : [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team', 
        },
      ],
      winner : {
        first : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "Team",
        },
        second : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "Team",
        },
        third : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "Team",
        },
      },
      track : {
        type : String,
        enum : ["Web3" , "AI" , "AR/VR", "Data & Gen AI", "IOT", "Cyber Securtiy", "Web & App Development", "Cloud & DevOps", "Open Innovation"],
        required : true
      },
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
