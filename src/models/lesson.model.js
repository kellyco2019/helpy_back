const { Schema, model } = require("mongoose");

const lessonSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [false, "The field is required"] 
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: [false, "you should be logged to create a lesson"]
    },
    description: { 
      type: String, 
      required: [false, "The field is required"] 
    },
    image: {
    type: String,
    required: false,
    },
    time: { 
      type: Number, 
      required: [false, "The field is required"] 
    },

    category: { type: [String],
    required: [false, "The field is required"] 
    },

    comments: { type: [String],
      required: [false, "The field is required"] 
      },
  },
  {
    timeStamps: true,
  }
);

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
