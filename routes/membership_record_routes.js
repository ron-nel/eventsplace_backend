const express = require("express");

const membershipRecordRouter = express.Router();

const MembershipRecordModel = require("../models/MembershipRecord");

const stripe = require("stripe")('sk_test_qPNeccUvbu4yo5ooSKmd0ix200Z5PI9C2F');

membershipRecordRouter.post("/addMemberRecord", function(req, res) {
	let newPost = MembershipRecordModel({
		"membershipId": req.body.membershipId,
		"membershipName": req.body.membershipName,
		"userEmail": req.body.userEmail,
		"price": req.body.price
	});

	newPost.save(function (err, post){
		if(!err) {
			return res.json({
				"member":post
			});
		} else {
			return res.send(err);
		}
	})
})

membershipRecordRouter.get("/showMemberRecord", function(req, res){
	MembershipRecordModel.find({}).then(function(result){
		return res.json({"result": result})
	})
})

membershipRecordRouter.get("/showMemberRecordById/:id", function(req, res){
	MembershipRecordModel.find({"postId":req.params.id}, function (err, result) {
		if(!err) {
			return res.json({"result": result})
		} else {
			return res.send(err);
		}
	})
})

membershipRecordRouter.delete("/memberRecord/delete/:id", function(req, res) {
	let $id = req.params.id
	MembershipRecordModel.findByIdAndRemove($id, function(err, result){
		if(!err) {
			return res.json({"result": result})
		} else {
			return res.send(err);
		}
	})
})

membershipRecordRouter.put("/memberRecord/update/:id", function(req, res) {
	MembershipRecordModel.update({"_id":req.params.id}, req.body).then(function(result) {
		if (result) {
			return res.json({"result": result})

		} else	{
			return res.send("No member record to update")
		}
	})
})
// membershipRecordRouter.post("/charge/membership", function(req, res){
// 	console.log(req.body.price * 100)
// 	stripe.customers.create({
// 		email: req.body.userEmail,
// 		description: "Membership Payment",
// 		source: "tok_visa" //obtained with stripe.js
// 	}).then(customer=>
// 		stripe.charges.create({
// 			amount: req.body.price,
// 			currency: "PHP",
// 			source: "tok_visa", // obtained with Stripe.js
// 			description: "Membership Payment"+req.body.stripeEmail,
// 		  })).then(result=>{
// 			  if(result.captured==true){
// 				  let newMembershipRecord = MembershipRecordModel({
// 					  "membershipId": req.body.membershipId,
// 					  "membershipName": req.body.membershipName,
// 					  "userEmail": req.body.userEmail,
// 					  "price": (req.body.price/100)
// 				  })

// 				  newMembershipRecord.save(function(err, membership){
// 					  if(!err){
// 						  return res.json({
// 							  "membership":membership
// 						  })
// 					  }else{
// 						  return res.send(err);
// 					  }
// 				  })
// 			  }else{
// 				  return res.send("Error");
// 			  }
// 		  })
// })


module.exports = membershipRecordRouter;