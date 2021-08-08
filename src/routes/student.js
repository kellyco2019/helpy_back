const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/signup").post(studentController.signup);
router.route("/signin").post(studentController.signin);
router.route("/").get(auth, studentController.list);
router.route("/:userId").get(auth, studentController.show);
router.route("/:userId").put(auth, studentController.update);
router.route("/updatePhoto/:userId").put(auth, 
    //formData, 
    studentController.photoProfile);
router.route("/:userId").delete(auth, studentController.destroy);

module.exports = router;
