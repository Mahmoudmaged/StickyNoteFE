const CitizenModel = require("../../../models/Citizen/citizen.model");
// const DoctorModel = require("../../../models/Citizen/doctor.model");
const mongoose = require("mongoose");
const Utils = require("../../../util/index");
const jwt = require("jsonwebtoken");
global.tokenBlackList = [];

function AuthenticationAPIS(app) {

    app.post("/signin", async(req, resp) => {
            var { email, password } = req.body;
            email = email.toLowerCase();
            let user = await CitizenModel.findOne({ email }).lean();
                // resp.json({ message: "success", citizen })
            if (user && user.password === password) {
                delete user.password
                jwt.sign(user, "mySecret", async(err, token) => {
                    resp.status(200).json({ message: "success", user, token: token });
                    if (err) resp.json({ message: "error signing in, try again", err });

                });

            } else if (!user) {
                resp.json({ message: "email doesn't exist", status: 401 });
            } else {
                resp.json({ message: "incorrect password", status: 401 });
            }
        }


    );




    app.post("/signOut", async(req, resp) => {
        const { token } = req.body;

        tokenBlackList.push(token);
        resp.json({ message: "success" }); //tokenBlackList
    });





}
module.exports = AuthenticationAPIS;
