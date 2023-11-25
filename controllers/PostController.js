// controllers/PostController.js
const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    const { description, category } = req.body;

    try {
        const post = new Post({ description, category });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    const { description, category } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { description, category },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCommentToPost = async (req, res) => {
    const { text } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({ text });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const upvotePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.upvotes += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const downvotePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.downvotes += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addCommentToPost,
    upvotePost,
    downvotePost,
  };
  