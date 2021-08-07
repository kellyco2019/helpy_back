const router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");
// const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/teacherProfile").post(
    //auth, formData, 
    lessonController.create);
//router.route("/").get(lessonController.showAll);
router.route("/lesson/:lessonId").get(lessonController.show);
router.route("/teacher").get(
    //auth, 
    lessonController.list);
router.route("/:lessonId").put(lessonController.update);

//PUT create comments and starts // student
router.route("/lesson/:lessonId").put(lessonController.updateComment);
//app.delete ('/books/:bookId',)
router.route("/:lessonId").delete(
    //auth,
    lessonController.destroy);


module.exports = router;
