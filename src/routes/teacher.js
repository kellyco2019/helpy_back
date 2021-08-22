const router = require("express").Router();
const teacherController = require("../controllers/teacher.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/signup").post(teacherController.signup);//ok
router.route("/signin").post(teacherController.signin);//ok
//router.route("/teachers").get(teacherController.list);//ok
router.route("/").get(auth, teacherController.show);//ok
router.route("/:userId").put( auth, teacherController.update); //ok
router.route("/updatePhoto/:userId").put( auth, 
            //formData, 
			teacherController.photoProfile);//ok
router.route("/:userId").delete(auth, teacherController.destroy);//ok


module.exports = router;