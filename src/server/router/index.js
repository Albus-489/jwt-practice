const Router = require("express");
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 15 }),
  userController.registration
);
router.post("/login", userController.login);

// logout and refresh tokens
router.post("/logout", userController.logout);

// link that will be sent to the email address
router.get("/activate/:link", userController.activate);

// endpoint to get refresh token if previous token was expired
router.get("/refresh", userController.refresh);

// test endpoint
router.get("/users", authMiddleware, userController.getAllUsers);

module.exports = router;
