var mongoose = require("mongoose");

// create schema
var NotesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    desc: String,
    citizenID: { type: mongoose.Schema.Types.ObjectId, ref: "Citizen" },

});

var NotesModel = new mongoose.model("notes", NotesSchema, "Notes");

module.exports = NotesModel;