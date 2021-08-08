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
      required: [false, "you should be logged to create a lesson"]
    },
    description: { 
      type: String, 
      required: [false, "The field is required"] 
    },
      photo: {
      type: [String],
      required: false,
      default: [
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg",
      ],
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
