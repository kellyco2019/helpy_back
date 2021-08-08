const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const { welcomeRoomie } = require("../utils/mailer");


module.exports = {
//create POST signup
  async signup(req, res) {
    try {
      const { body } = req;
      const student = await Student.create(body);
      const token = jwt.sign(
        { userId: student._id },
         process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 * 365 });
    //  await welcomeRoomie(roomie)
       res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

//crete POST signin
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ email });

      if (!student) {
        throw new Error("Password or invalid email");
      }

      const isValid = await bcrypt.compare(password, student.password);

      if (!isValid) {
        throw new Error("Password or invalid email");
      }

      const token = jwt.sign({ 
        userId: student._id }, 
        process.env.SECRET, 
      { expiresIn: 60 * 60 * 24 * 365,});

      res.status(201).json({token ,student});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async list(req, res) {
    try {
      const students = await Student.find().populate("Lesson");
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //show GET see profile 
  async show(req, res) {
    try {
      const { userId } = req.params;
      const profile = await Student.findById(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  //update PUT Profile
  async update(req, res) {
    try {
      const { body } = req; 
      const { userId } = req.params;     
      const profile = await Student.findByIdAndUpdate(userId, body, {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
async photoProfile(req, res) {
  try {
    const { body } = req; 
    const { userId } = req.params;
  
    if (body.photo.length === 0) {
      body.photo[0] =
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
    }
    const profilePhoto = await Student.findByIdAndUpdate(
      userId,
      { photo: body.photo[0] },
      {
        new: true,
      }
    );
    res.status(201).json(profilePhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},
  //delete DELETE profile 
  async destroy(req, res) {
    try {
      const { body } = req; 
      const { userId } = req.params;
      const student = await Student.findByIdAndDelete(userId);
      res.status(200).json({message: 'profile deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },


}

