const router = require("express").Router();
const AuthController = require("./constrollers/AuthController");
const UserController = require("./constrollers/UserController");
const DashboardController = require("./constrollers/DashboardController");
const DynamicTableController = require("./constrollers/DynamicTableController");
const manage = require("./constrollers/ManageController");
const userTableColumn = require("./constrollers/UserTableColumnController");

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
  .route("/multipleUserDelete/")
  .post(adminAuth, UserController.user.multipleUserDelete);
router
  .route("/dashboard")
  .get(adminAuth, DashboardController.dashboard.rolebasedCount);
router
  .route("/collection")
  .post(adminAuth, DynamicTableController.DBC.createCollection);
router
  .route("/collections")
  .get(adminAuth, DynamicTableController.DBC.getCollection);
router.route("/get-data").post(adminAuth, DynamicTableController.DBC.getData);
router
  .route("/get-data-byid/:id")
  .get(adminAuth, DynamicTableController.DBC.getDataById);
router.route("/add-data").post(adminAuth, DynamicTableController.DBC.addData);
router
  .route("/delete-data/:id")
  .delete(adminAuth, DynamicTableController.DBC.deleteData);
router
  .route("/update-data/:id")
  .put(adminAuth, DynamicTableController.DBC.updateData);
router.route("/modal").post(adminAuth, DynamicTableController.DBC.createModal);
router
  .route("/modal")
  .get(adminAuth, DynamicTableController.DBC.createModalData);

router
  .route("/manage")
  .post(validation.titleValidation, adminAuth, manage.manage.store);
router
  .route("/manage/:id")
  .put(validation.titleValidation, adminAuth, manage.manage.update);
router.route("/manage").get(adminAuth, manage.manage.list);
router.route("/manage/:id").get(adminAuth, manage.manage.showOne);
router.route("/manage/:id").delete(adminAuth, manage.manage.delete);

//*********************************** */
router.route("/user-table-column").post(validation.titleLabelValidation, adminAuth, userTableColumn.userTableColumn.store);
router.route("/user-table-column/:id").put(validation.titleLabelValidation, adminAuth, userTableColumn.userTableColumn.update);
router.route("/user-table-column").get(adminAuth, userTableColumn.userTableColumn.list);
router.route("/user-table-column/:id").get(adminAuth, userTableColumn.userTableColumn.showOne);
router.route("/user-table-column/:id").delete(adminAuth, userTableColumn.userTableColumn.delete);



module.exports = router;
