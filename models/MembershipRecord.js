const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MembershipRecordScheme = new Schema({
	membershipId: String,
	membershipName: String,
	userEmail: String,
	price: Number



});

module.exports = mongoose.model("MembershipRecord", MembershipRecordScheme);
