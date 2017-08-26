'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CompanySchema = new Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

var Company = mongoose.model("Company", CompanySchema);
module.exports.Company = Company;