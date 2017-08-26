'use strict';

var express = require('express');
var router = express.Router();
var Company = require("../models/models").Company;

router.get("/", function(req, res) {
    Company.find({})
        .sort({createdAt: -1})
        .exec(function (err, companies) {
            if (err) {
                return next(err);
            }

            res.json(companies);
        });
});

module.exports = router;