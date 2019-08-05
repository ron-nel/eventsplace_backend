const express = require("express");
const postRouter = express.Router();
const PostModel = require("../models/Post");

postRouter.post("/addPost", function(req, res){
	let newPost = PostModel({
		"postTitle": req.body.postTitle,
		"postBody": req.body.postBody
	});

	newPost.save(function (err, post){
		if(!err){
			return res.json({
				"post":post
			});
		} else {
			return res.send(err);
		}
	});
});

postRouter.get("/showPosts", function(req, res){
	PostModel.find({}).then(function(result){
		return res.json({"result":result})
	});
});

module.exports = postRouter;