const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
 
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Invalid email or password"],
      validate: [
        {
          async validator(email) {
            try {
              const student = await models.Student.findOne({ email });
              return !student;
            } catch (error) {
              return false;
            }
          },
          message: "email is already being used",
        },
      ],
    },
    password: {
      type: String,
      required: false,
      match: [passwordRegExp, "Invalid email or password"],
    },
  
    activity: {
      type: [String],
      required: false,
    },
    photo: {
      type: [String],
      required: false,
      default: [
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg",
      ],
    },

    lessons: {
      type: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    },

  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Student = model("Student", studentSchema);

module.exports = Student;