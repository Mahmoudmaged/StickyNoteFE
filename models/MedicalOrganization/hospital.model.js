var mongoose = require("mongoose");

// create schema
var HospitalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lat: Number,
  lng: Number,
  capacity: Number,
  website: String,
  medical_org: { type: mongoose.Schema.Types.ObjectId, ref: "medicalOrg" },


});

var HospitalModel = new mongoose.model("hospital", HospitalSchema, "Hospital");

module.exports = HospitalModel;
