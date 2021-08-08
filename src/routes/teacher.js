const router = require("express").Router();
const teacherController = require("../controllers/teacher.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");


router.route("/signup").post(teacherController.signup);
router.route("/signin").post(teacherController.signin);
router.route("/").get(teacherController.list);
router.route("/:userId").get( auth, teacherController.show);
router.route("/:userId").put( auth, teacherController.update);
router.route("/updatePhoto/:userId").put( auth, 
            //formData, 
			teacherController.photoProfile);
router.route("/:userId").delete(auth, teacherController.destroy);


module.exports = router;