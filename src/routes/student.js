const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/signup").post(studentController.signup);//ok
router.route("/signin").post(studentController.signin);//ok
router.route("/").get(studentController.list);//ok
router.route("/:userId").get( studentController.show);//ok
router.route("/:userId").put(auth, studentController.update);//ok
router.route("/updatePhoto/:userId").put(auth, 
    //formData, 
    studentController.photoProfile);//ok
router.route("/:userId").delete(auth, studentController.destroy);//ok

module.exports = router;
