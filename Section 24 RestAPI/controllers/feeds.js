const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
        res.status(200).json({message: "Success", posts: posts})
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((result) => {
      if (!result) {
        const err = new Error("Not Found");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({ message: "Success", post: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createPosts = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("Error Encountered");
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({ message: "Validation Failed", error: error });
  }
  const title = req.body.title;
  const content = req.body.content;
  // create post in DB
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "dummyUrl",
    creator: { name: "Rajan" },
  });

  post
    .save()
    .then((result) => {
      console.log("Saved successfully: ", result);
      res.status(201).json({
        message: "Post Created successfully",
        post: result,
      });
    })
    .catch((error) => {
      //   console.log("Error Encountered while saving to DB: ", error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
