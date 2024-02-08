const router = require("express").Router();
const AuthController = require("./constrollers/AuthController");
const UserController = require("./constrollers/UserController");
const DashboardController = require("./constrollers/DashboardController");

const validation = require("./utils/validation");
const middleware = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");

//user
router
  .route("/register")
  .post(validation.registerValidation, AuthController.auth.register);
router
  .route("/user")
  .post(adminAuth, validation.registerValidation, AuthController.auth.register);
router
  .route("/login")
  .post(validation.loginValidation, AuthController.auth.login);
router.route("/users").get(adminAuth, UserController.user.list);
router.route("/user/:id").get(adminAuth, UserController.user.showOne);
router.route("/user/:id").delete(adminAuth, UserController.user.delete);
router.route("/user/:id").put(adminAuth, UserController.user.update);
router
  .route("/dashboard")
  .get(adminAuth, DashboardController.dashboard.rolebasedCount);

module.exports = router;
