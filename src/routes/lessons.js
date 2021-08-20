const router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");
const { auth } = require("../utils/middlewares");
const { formData } = require("../utils/formData");

router.route("/teacherProfile/").post( 
    auth, 
    lessonController.create);//ok esto ya esta, crea la publicacion con el teacher
    router.route("/imagenLesson/").post( 
        auth, 
        formData, 
        lessonController.createPicture);//esto crea la photo con form data.
router.route("/").get(lessonController.showAll);
router.route("/teacher/").get(auth, lessonController.list);//ok una lesson por profe     
router.route("/lesson/:lessonId").get(lessonController.show);//ok
router.route("/home").get(lessonController.listAll);
router.route("/").put(
    auth, 
    lessonController.update);//ok
//PUT create comments and starts // student
// router.route("/lesson/:lessonId").put(auth, lessonController.updateComment);
router.route("/:lessonId").delete( auth, lessonController.destroy);//ok

module.exports = router;
