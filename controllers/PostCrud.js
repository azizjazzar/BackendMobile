const Post = require("../models/posts.js");
const Comment = require("../models/Comment.js")

module.exports = {
  createPost: async (req, res) => {
    try {
      console.log('Form Data:', req.body);

      const { iduser, title, content, author } = req.body;

      const post = await Post.create({
        iduser: iduser,
        title: title,
        content: content,
        author: author,
      });

      await post.save();

      return res.status(201).json({
        statusCode: 201,
        message: 'Post created',
        post: post,
      });
    } catch (error) {
      console.error('Error in createPost:', error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },

  fetchPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: "Post not found",
        });
      }

      return res.status(200).json({
       
        post: post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();

      return res.status(200).json({
        
        posts: posts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: "Post not found",
        });
      }

      await post.remove();

      return res.status(200).json({
        statusCode: 200,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.like += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Corrected dislike function
  dislike: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.dislike += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createComment: async (req, res) => {
    try {
      const { postId, commenter, text } = req.body;

      if (!postId || !commenter || !text) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Missing required fields for comment',
        });
      }

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }

      const comment = new Comment({
        postId: postId,
        commenter: commenter,
        text: text,
      });

      await comment.save();

      if (!post.comments) {
        post.comments = [];
      }

      post.comments.push(comment);

      await post.save();

      return res.status(201).json({
        statusCode: 201,
        message: 'Comment created',
        comment: comment,
      });
    } catch (error) {
      console.error('Error in createComment:', error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },

  fetchComments: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }

      const comments = await Comment.find({ postId: postId });

      if (!comments || comments.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: 'No comments found',
          comments: [],
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: 'Comments fetched successfully',
        comments: comments,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },
};
