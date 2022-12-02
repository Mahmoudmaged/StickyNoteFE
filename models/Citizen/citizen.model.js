var mongoose = require("mongoose");
var uniqueEmailValidator = require('mongoose-unique-validator');


//create schema
var CitizenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, max: 15 },
    last_name: { type: String, max: 15 },
    email: { type: String, unique: true, required: true },
    password: { type: String, max: 50, min: 8, required: true },
    // pic_url: String,
    age: Number
});


// create model of schema to be enabled to do any query
var CitizenModel = new mongoose.model("citizen", CitizenSchema, "Citizen");
CitizenSchema.plugin(uniqueEmailValidator, { message: 'email already registered' });

module.exports = CitizenModel