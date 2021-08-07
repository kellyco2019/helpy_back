const { Schema, model, models } = require("mongoose");
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
//const bcrypt = require("bcrypt");

const teacherSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "The field is required"],
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Invalid e-mail"],
      validate: [
        {
          async validator(email) {
            try {
              const teacher = await models.Teacher.findOne({ email });
              return !teacher;
            } catch (error) {
              return false;
            }
          },
          message: "this email is already been used",
        },
      ],
    },
    password: { 
      type: String, 
      required: false,
      match: [passwordRegExp, "Invalid password"] 

    },
    description: {
      type: String,
      required: false,
      minlength: [8, "Do a better description about you (minimum 10 words)"],
    },
    photo: {
      type: [String],
      required: false,
      default: [
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg",
      ],
    },
    lessons: {
      type: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

// teacherSchema.pre("save", async function () {
//   if (this.password && this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
// });

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
