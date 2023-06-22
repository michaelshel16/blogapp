const express = require('express');
const router  = express.Router();
const controller = require("../controllers/Controller.js");
const  verifyToken  = require('../middleware/auth.js');


router.post("/register",controller.register);

router.post("/login",controller.login);

router.post("/user/posts",controller.createPost);

router.get("/:userId/posts",verifyToken,controller.getUserPosts)





module.exports = router;