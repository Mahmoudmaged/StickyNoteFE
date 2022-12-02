const CitizenModel = require("../../models/Citizen/citizen.model");

const mongoose = require("mongoose");
const Utils = require("../../util/index");
//const jwt = require("jsonwebtoken");
global.tokenBlackList = [];

function CitizenAPIS(app) {

    app.post("/signup", async(req, resp) => {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                age
            } = req.body;
            emailLower = email.toLowerCase();

            //save citizen
            let citizen = new CitizenModel({
                _id: mongoose.Types.ObjectId(),
                first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
                last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
                email: emailLower,
                password,
                age
            });
            await citizen.save(); // async --> save citizen

            resp.json({ message: "success" });


        } catch (e) {
            resp.json(e);
        }
    });




    app.get("/getAllUsers", async(req, resp) => {
        try {
            let citizens = await CitizenModel.find({}, { password: 0 });

            if (citizens.length > 0) {
                resp.json({ message: "success", citizens });
            } else {
                resp.json({ message: "no citizens found" });
            }
        } catch (e) {
            resp.json(e);
        }
    });







}

module.exports = CitizenAPIS;