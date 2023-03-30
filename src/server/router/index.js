const Router = require("express");

const router = new Router();

router.post("/registration");
router.post("/login");

// logout and refresh tokens
router.post("/logout");

// link that will be sent to the email address
router.get("/activate/:link");

// endpoint to get refresh token if previous token was expired
router.get("/refresh");

// test endpoint
router.get("/users");
