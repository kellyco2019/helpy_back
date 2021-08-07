const Lesson = require("../models/lesson.model");
const Teacher = require("../models/teacher.model");

module.exports = {
    //create POST crearlesson
  async create(req, res) {
    console.log("tengo sueño")
    try {
      const { body, userId } = req;

      const lesson = await Lesson.create({
        ...body,
        teacher: userId,
      });
      const teacher = await Teacher.findById(userId);
      teacher.lessons.push(lesson._id);
      await teacher.save({ validateBeforeSave: false });
      res.status(201).json(lessons);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err.message);
    }
  },

  //mostrar todas GET lessons de todos
  // async showAll(req, res) {
  //   const { tags } = req.query;
  //   try {
  //     let ads = "";
  //     if (tags) {
  //       ads = await Lesson.find({
  //         _id: { $nin: reservedAdsIds },
  //         city,
  //       });
  //     } else {
  //       ads = await Advertisement.find({
  //         _id: { $nin: reservedAdsIds },
  //       });
  //     }
  //     res.status(200).json(ads);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },

//show GET see one lesson 
async show(req, res) {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId)
      .populate("teacher")
    res.status(200).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

//list GET by teacher 
  async list(req, res) {
    try {
      const { userId } = req;
      const lesson = await Lesson.find({ teacher: userId });
      res.status(201).json(lesson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

 //update PUT lesson()
  async update(req, res) {
    try {
      const { params: { lessonId }, body  } = req;
      const lesson = await Lesson.findByIdAndUpdate(lessonId, body, {
        new: true,
      });
      res.status(200).json(lesson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateComment(req,res){
    try{
    const { body, params } = req
    const student = await Student.findById(userId);
    if (!student) {
      throw new Error("User not found");
    }

    if (body.comments.length === 0) {
      body.comments[0] = 
        "escríbenos tu comentario aquí";
    }
    const comments = await Lesson.findByIdAndUpdate(lessonId, { comments: body.comments }, {new: true,});

  let updatedLesson;
  lessons = lessons.map(lesson => {
    if(lesson._id === params.lessonId) {
      const comments = [ ...lesson.comments, body.comment]
      

      updatedLesson = {
        ...lesson,
        comments,
        
      }

      return updatedLesson
    }
    return lesson
  })
  res.status(200).json({ message: 'El comentario se actualizó', lesson: updatedlesson , comments })
} catch (err) {
  res.status(400).json({ message: err.message });
  console.log(err.message);
}
},

//delete DELETE lesson
//app.delete ('/books/:bookId',)
  async destroy(req, res) {
    try {
      const { lessonId } = req.params;
      const lesson = await Lesson.findByIdAndDelete(lessonId);
      res.status(200).json( { message:`post ${lessonId} delete`});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};