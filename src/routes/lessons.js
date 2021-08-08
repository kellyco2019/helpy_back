const router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/teacherProfile/:userId").post( auth, 
    //formData, 
    lessonController.create);//ok esto ya esta, crea la publicacion con el teacher
//router.route("/").get(lessonController.showAll);
router.route("/teacher/").get(
        //auth, 
        lessonController.list);//ok
router.route("/lesson/:lessonId").get(lessonController.show);//ok
router.route("/:lessonId").put(auth, lessonController.update);//ok
//PUT create comments and starts // student
// router.route("/lesson/:lessonId").put(auth, lessonController.updateComment);
router.route("/:lessonId").delete( auth, lessonController.destroy);//ok

module.exports = router;
