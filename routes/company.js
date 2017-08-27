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

// POST /questions
router.post("/", function(req, res, next) {
    var company = new Company(req.body);
    company.save(function (err, question) {
        if (err) return next(err);
        res.status(201);
        res.json(company);
    });
});

module.exports = router;