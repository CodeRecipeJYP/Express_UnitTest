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
        if (err) {
            var err = new Error("You must contain the name.");
            err.status = 400;
            return next(err);
        }
        res.status(201);
        res.json(company);
    });
});

router.param("cId", function (req, res, next, id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        var err = new Error("Invalid id.");
        err.status = 400;
        return next(err);
    }

    Company.findById(id, function (err, doc) {
        if (err) {
            return next(err);
        }
        if (!doc) {
            err = new Error("Not found.");
            err.status = 404;
            return next(err);
        }

        req.company = doc;
        return next();
    });
});

router.get("/:cId", function(req, res) {
    res.json(req.company);
});

module.exports = router;