
const express = require("express");
const router = express.Router();
const {createComment,createPost,deletePost,dislike,fetchAllPosts,fetchComments,fetchPost,like
} = require("../controllers/PostCrud");

router.post('/add', createPost);
router.post('/:id/like',like)
router.post('/:id/dislike',dislike )
router.post('/comments/add', createComment);

// Read
router.get('/posts/:id', fetchPost);
router.get('/posts', fetchAllPosts);
router.get('/comments/:postId', fetchComments);


router.delete('/posts/:id', deletePost);

module.exports = router;
