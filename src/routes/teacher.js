const router = require("express").Router();
const teacherController = require("../controllers/teacher.controller");
// const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");


router.route("/signup").post(teacherController.signup);
router.route("/signin").post(teacherController.signin);
router.route("/").get(teacherController.list);
router.route("/:userId").get(
    //auth, 
    teacherController.show);
//ruta debe ser app.put('/books/:bookId')
router.route("/:userId").put(
    //auth, formData, 
    teacherController.update);
router.route("/updatePhoto").put(
			//auth, formData, 
			teacherController.photoProfile);
//poner en la ruta app.delete('/books/:bookId',zzz)
router.route("/:userId").delete(teacherController.destroy);


module.exports = router;