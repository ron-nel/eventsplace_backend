const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
	postTitle: String,
	postBody: String
});

module.exports = mongoose.model("Post", PostSchema);