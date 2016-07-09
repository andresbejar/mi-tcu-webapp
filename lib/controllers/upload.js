'use strict';

var fs = require('fs'),
	multer = require('multer'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
		cb(null, './app/images/');
	},
    filename: function (req, file, cb) {
		var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ storage: storage}).single('file');

exports.upload = function(req, res){
	
	upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        console.log(req.user._id);
        User.findById(req.user._id, function(err, user){
			if(err){
				return res.send(err);
			}
			if(!user){
				return res.send(404);
			}
			else{
				user.profilePic = req.file.filename;
				user.save(function(err){
					if(err){
						return res.send(err);
					}
					else{
						console.log("Profile pic updated");
						return res.json({error_code: 0, url: req.file.filename});
					}
				});
			}
		});
	});

};