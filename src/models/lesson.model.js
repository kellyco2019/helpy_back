const { Schema, model } = require("mongoose");

const lessonSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, "The field is required"] 
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    description: { 
      type: String, 
      required: [true, "The field is required"] 
    },
    photo: { 
      type: [String], 
      required: [true, "The field is required"] 
    },
    video: { 
      type: [String], 
      required: [true, "The field is required"] 
    },
    time: { 
      type: Number, 
      required: [true, "The field is required"] 
    },
    tags: { type: [String],
    required: [false, "The field is required"] 
    },
    //reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  {
    timeStamps: true,
  }
);

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
