const router = require("express").Router();
const studentController = require("../controllers/student.controller");
// const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/signup").post(studentController.signup);
router.route("/signin").post(studentController.signin);
router.route("/").get(studentController.list);
router.route("/profile").get(
    //auth, 
    studentController.show);
router.route("/profile").put(
    //auth, 
    studentController.update);
router.route("/photoProfile").put(
    //auth, formData, 
    studentController.photoProfile);
router.route("/:userId").delete(studentController.destroy);

module.exports = router;
