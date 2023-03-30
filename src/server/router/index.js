const Router = require("express");
const userController = require("../controllers/user-controller");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);

// logout and refresh tokens
router.post("/logout", userController.logout);

// link that will be sent to the email address
router.get("/activate/:link", userController.activate);

// endpoint to get refresh token if previous token was expired
router.get("/refresh", userController.refresh);

// test endpoint
router.get("/users", userController.getUsers);

module.exports = router;
