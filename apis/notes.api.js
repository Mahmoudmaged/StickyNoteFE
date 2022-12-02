const NotesModel = require("../models/notes.model.js");

const mongoose = require("mongoose");
const Utils = require("../util/index");
global.tokenBlackList = [];

function NotesAPIS(app) {

    app.post("/addNote", Utils.verifyToken, async(req, resp) => {
        try {
            const {
                title,
                desc,
                citizenID
            } = req.body;

            //save note
            let note = new NotesModel({
                _id: mongoose.Types.ObjectId(),
                title,
                desc,
                citizenID
            });
            await note.save(); // async --> save note

            resp.json({ message: "success" });


        } catch (e) {
            resp.json(e);
        }
    });




    app.post("/getAllNotes", Utils.verifyToken, async(req, resp) => {
        try {
            let notes = await NotesModel.find();

            if (notes.length > 0) {
                resp.json({ message: "success", notes });
            } else {
                resp.json({ message: "no notes found" });
            }
        } catch (e) {
            resp.json(e);
        }
    });

    app.post("/getUserNotes", Utils.verifyToken, async(req, resp) => {
        try {
            let { userID } = req.body;
            let Notes = await NotesModel.find({ citizenID: userID }, { citizenID: 0 })
            if (Notes.length != 0)
                resp.json({ message: "success", Notes });
            else
                resp.json({ message: "no notes found" });

        } catch (e) {
            resp.json({ message: "Error", e });
        }
    });
    app.delete("/deleteNote", Utils.verifyToken, async(req, resp) => {
        let { NoteID } = req.body;
        try {
            // let note = await NotesModel.findById({ _id: NoteID });
            // let citizen = await CitizenModel.findById({ _id: doc.citizen });
            await NotesModel.deleteOne({ _id: NoteID });
            // await CitizenModel.deleteOne({ _id: citizen._id });
            resp.json({ message: "deleted" });
        } catch (e) {
            resp.json({ message: "error", e });
        }
    });


    app.put("/updateNote", Utils.verifyToken, async(req, resp) => {
        try {
            const {
                NoteID,
                title,
                desc,

            } = req.body;

            let doc = await NotesModel.findById({ _id: NoteID });
            if (doc) {
                await NotesModel.findOneAndUpdate({ _id: NoteID }, { title, desc });
                resp.json({ message: "updated" });
            } else {
                resp.json({ message: "note not found" });
            }
        } catch (e) {
            resp.json({ message: "error", e });
        }
    });


    app.post("/getNoteDetailsByID", Utils.verifyToken, async(req, resp) => {
        try {
            let { NoteID } = req.body;
            let note = await NotesModel.findById({ _id: NoteID })
            resp.json({ message: "success", note });

        } catch (e) {
            resp.json({ message: "error", e });
        }
    });



}

module.exports = NotesAPIS;
