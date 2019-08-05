const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
	name: String,
	price: Number,
	qty: Number



});

module.exports = mongoose.model("Membership", MembershipSchema);
