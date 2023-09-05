const express = require('express');
const router  = express.Router();
const controller = require("../controllers/Controller.js");
const  verifyToken  = require('../middleware/auth.js');


router.post("/register",controller.register);

router.post("/login",controller.login);

router.post("/googleRegister",controller.googleAccountRegister);

router.post("/gmaillogin",controller.gmailLogin);

router.post("/finduser",controller.findUser);

router.patch("/passwordreset/user",controller.passwordReset);

router.post("/passwordverify/user",controller.passwordResetVerify);


router.delete("/:postId/:deleteimage/post",verifyToken,controller.deletePost);

router.get("/:userId/posts",verifyToken,controller.getUserPosts);

router.get("/post/:id",controller.getPost);

router.get("/posts/tech",controller.getTechPosts);

router.get("/posts/business",controller.getBusinessPosts);

router.get("/posts/reviews",controller.getReviewPosts)



module.exports = router;