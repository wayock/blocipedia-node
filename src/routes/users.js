const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController")

router.get("/users/sign_up", userController.signUp);
router.get("/users/sign_in", userController.signInForm);
router.get("/users/sign_out", userController.signOut);
router.get("/users/collaborations", userController.showCollaborators);
router.get("/users/:id", userController.show);
router.get("/users/:id/upgrade-page", userController.upgradePage);

router.post("/users", validation.validateUsers, userController.create);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.post("/users/:id/upgrade", userController.upgrade);
router.post("/users/:id", userController.downgrade);





module.exports = router;
