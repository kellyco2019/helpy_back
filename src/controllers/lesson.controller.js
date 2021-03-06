const Lesson = require("../models/lesson.model");
const Teacher = require("../models/teacher.model");

module.exports = {
    //create POST crearlesson

  async create(req, res) {
    try {
      const { userId , body } = req;
      // if (body.photo.length === 0) {
      //   body.photo[0] =
      //     "https://res.cloudinary.com/evollve-sas/image/upload/v1629224085/12603152173156694431_pfdaxv.jpg";
      // }
      const teacher = await Teacher.findById(userId)
      if (!teacher) {
        throw new Error("error en el controlador");
      }
      const lesson = await Lesson.create({ ...body,
      teacher: userId
      //photo: body.photo[0],
      });
      teacher.lessons.push(lesson._id);
     await teacher.save({ validateBeforeSave: false });
      res.status(201).json(lesson);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // async createPicture(req, res) {
  //   try {
  //     const { userId , body } = req;
  //     if (body.photo.length === 0) {
  //       body.photo[0] =
  //         "https://res.cloudinary.com/evollve-sas/image/upload/v1629224085/12603152173156694431_pfdaxv.jpg";
  //     }
  //     const teacher = await Teacher.findById(userId)
  //     if (!teacher) {
  //       throw new Error("error en el controlador");
  //     }
  //     const photo = await Lesson.create({
  //     teacher: userId,
  //     photo: body.photo[0],
  //     });
  //     teacher.lessons.push(photo);
  //    await teacher.save({ validateBeforeSave: false });
  //     res.status(201).json(photo);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //     //console.log(error)
  //   }
  // },

 //mostrar todas GET lessons de todos//filtro categoria 
  async showAll(req, res) {
   
    const { category } = req.query;
    try {
      let lessons = "";
      if (category) {
        lessons = await Lesson.find({   
          category,
        });
      } else {
        lessons = await Lesson.find();
      }
      res.status(200).json(lessons);
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

  //list all no filters
  async listAll(req, res) {
    try {
      const { body } = req;
      const lesson = await Lesson.find();
      res.status(201).json(lesson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  //show GET see one lesson 
async show(req, res) {
  
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId)
    .populate("Teacher")
    res.status(200).json(lesson);
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

//   async updateComment(req,res){
//     try{
//     const { body, params } = req
//     const student = await Student.findById(userId);
//     if (!student) {
//       throw new Error("User not found");
//     }

//     if (body.comments.length === 0) {
//       body.comments[0] = 
//         "escr??benos tu comentario aqu??";
//     }
//     const comments = await Lesson.findByIdAndUpdate(lessonId, { comments: body.comments }, {new: true,});

//   let updatedLesson;
//   lessons = lessons.map(lesson => {
//     if(lesson._id === params.lessonId) {
//       const comments = [ ...lesson.comments, body.comment]
      

//       updatedLesson = {
//         ...lesson,
//         comments,
        
//       }

//       return updatedLesson
//     }
//     return lesson
//   })
//   res.status(200).json({ message: 'El comentario se actualiz??', lesson: updatedlesson , comments })
// } catch (err) {
//   res.status(400).json({ message: err.message });
//   console.log(err.message);
// }
// },

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