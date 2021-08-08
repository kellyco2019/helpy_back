const Teacher = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const {welcomeHost} = require("../utils/mailer")

module.exports = {
//create POST signup
  async signup(req, res) {
    try {
      const { body } = req;
      const teacher = await Teacher.create(body);
      const token = jwt.sign({ 
        userId: teacher._id }, 
        process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
    //   await welcomeHost(userh)
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  //crete POST signin
  async signin(req, res) {
    try {
      const { password, email } = req.body;
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        throw new Error("Invalid email or password2");
      }
      const isValid = await bcrypt.compare(password, teacher.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign({ userId: teacher._id },
        process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365
      });
      res.status(201).json({ teacher, token });
      lesson.teacher.push(teacher.username);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
// GET see all teaachers    
async list(req, res) {
    try {
      const teacher = await Teacher.find().populate('Lesson');
      res.status(201).json(teacher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
//show GET see profile
async show(req, res) {
    try {
      const { userId } = req.params;
      //const { params: { userId }, body } = req;
      const profile = await Teacher.findById(userId);
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
      //const { params: { userId }, body } = req;
      const profile = await Teacher.findByIdAndUpdate(userId, body, 
      {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
//update PUT photoProfile
async photoProfile(req, res) {
  try {
    const { body } = req; 
    const { userId } = req.params;
  
    if (body.photo.length === 0) {

      body.photo[0] =
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
    }
    const profilePhoto = await Teacher.findByIdAndUpdate(
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
      const { userId } = req.params;
      const teacher = await Teacher.findByIdAndDelete(userId);
      res.status(200).json({message: 'profile deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};