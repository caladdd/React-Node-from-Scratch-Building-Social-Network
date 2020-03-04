const express = require("express");
const {
  getPosts,
  createPosts,
  postByUser,
  isPoster,
  deletePost,
  postById
} = require("../controllers/post");
const { requireSignIn } = require("../../authentication/controllers/auth");
const { createPostValidator } = require("../validator/validator");
const { userById } = require("../../authentication/controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post(
  "/post/new/:userId",
  requireSignIn,
  createPosts,
  createPostValidator
);
router.get("/post/by/:userId", requireSignIn, postByUser);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);

// any route contain :userId, our app first execute userById()
router.param("userId", userById);
// any route contain :postId, our app first execute postById()
router.param("postId", postById);

module.exports = router;
