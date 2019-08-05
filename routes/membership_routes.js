const express = require("express");

const membershipRouter = express.Router();

const MembershipModel = require("../models/Membership");

membershipRouter.post("/addMember", function(req, res) {
	let newPost = MembershipModel({
		"name": req.body.name,
		"price": req.body.price,
		"qty": req.body.qty
	});

	newPost.save(function (err, post){
		if(!err) {
			return res.json({
				"membership":post
			});
		} else {
			return res.send(err);
		}
	})
})

membershipRouter.get("/showMember", function(req, res){
	MembershipModel.find({}).then(function(result){
		return res.json({"result": result})
	})
})

membershipRouter.get("/showMemberById/:id", function(req, res){
	MembershipModel.find({"_id":req.params.id}, function (err, result) {
		if(!err) {
			return res.json({"result": result})
		} else {
			return res.send(err);
		}
	})
})

membershipRouter.delete("/member/delete/:id", function(req, res) {
	let $id = req.params.id
	MembershipModel.findByIdAndRemove($id, function(err, result){
		if(!err) {
			return res.json({"result": result})
		} else {
			return res.send(err);
		}
	})
})

membershipRouter.put("/member/update/:id", function(req, res) {
	MembershipModel.update({"_id":req.params.id}, req.body).then(function(result) {
		if (result) {
			return res.json({"result": result})

		} else	{
			return res.send("No member to update")
		}
	})
})


module.exports = membershipRouter;