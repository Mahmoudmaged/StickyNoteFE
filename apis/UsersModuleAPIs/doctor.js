var DoctorModel = require("../../models/Citizen/doctor.model");
var CitizenModel = require("../../models/Citizen/citizen.model");

var mongoose = require("mongoose");
var Utils = require("../../util/index");

function DoctorAPIS(app) {
    app.post("/addDoctor", Utils.verifyToken, async(req, resp) => {
        try {
            const {
                first_name,
                last_name,
                email,
                pic_url,
                password
            } = req.body;

            //save citizen
            let citizen = new CitizenModel({
                _id: mongoose.Types.ObjectId(),
                first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
                last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
                email,
                pic_url,
                password
            });
            await citizen.save(); // async --> save citizen

            resp.json({ message: "success" });
        } catch (e) {
            resp.json({ message: "error", e });
        }
    });




    app.get("/getAllDoctors", Utils.verifyToken, async(req, resp) => {
        try {
            let doctors = await DoctorModel.find({})
            if (doctors.length > 0) {
                doctors.sort(function(a, b) {
                    if (a.citizen.first_name.toLowerCase() < b.citizen.first_name.toLowerCase()) { return -1; }
                    if (a.citizen.first_name.toLowerCase() > b.citizen.first_name.toLowerCase()) { return 1; }
                    return 0;
                })
                resp.json({ message: "success", doctors });
            } else
                resp.json({ message: "no doctors found" });

        } catch (e) {
            resp.json(e);
        }
    });





    app.delete("/deleteDoctor", Utils.verifyToken, async(req, resp) => {
        let { doc_id } = req.body;
        try {
            let doc = await DoctorModel.findById({ _id: doc_id });
            let citizen = await CitizenModel.findById({ _id: doc.citizen });

            await DoctorModel.deleteOne({ _id: doc_id });
            await CitizenModel.deleteOne({ _id: citizen._id });
            resp.json({ message: "deleted" });
        } catch (e) {
            resp.json({ message: "error", e });
        }
    });





    app.put("/updateDoctor", Utils.verifyToken, async(req, resp) => {
        try {
            const {
                doc_id,
                first_name,
                last_name,
                email,
            } = req.body;

            let doc = await DoctorModel.findById({ _id: doc_id });
            if (doc) {
                await DoctorModel.findOneAndUpdate({ _id: doc_id }, { specialization: spec });

                //only update id and email if they are changed because they are unique
                let citizen = await CitizenModel.findById({ _id: doc.citizen });

                await CitizenModel.findOneAndUpdate({ _id: doc.citizen }, {
                    email: email,
                    first_name: first_name.charAt(0).toUpperCase() + f_name.slice(1),
                    last_name: last_name.charAt(0).toUpperCase() + l_name.slice(1),
                    password,
                });
                resp.json({ message: "updated" });
            } else {
                resp.json({ message: "doctor not found" });
            }
        } catch (e) {
            resp.json({ message: "error", e });
        }
    });








    app.post("/getDoctorDetailsByID", async(req, resp) => {
        try {
            let { doc_id } = req.body;
            let doc = await DoctorModel.findById({ _id: doc_id })
            resp.json({ message: "success", doc });

        } catch (e) {
            resp.json({ message: "error", e });
        }
    });




    // app.post("/getAllHospitalsOfDoctor", Utils.verifyToken, async (req, resp) => {
    //   try {
    //     const { doc_id } = req.body;
    //     let hospitals = await Work10Model.find({ doctor_id: doc_id }).populate({
    //       path: "medicalOrg_code",
    //       populate: [
    //         { path: "phone" },
    //         {
    //           path: "street",
    //           populate: {
    //             path: "area",
    //             populate: { path: "city" }
    //           }
    //         }
    //       ]
    //     });

    //     resp.json({ message: "success", hospitals });
    //   } catch (e) {
    //     resp.json({ message: "error", e });
    //   }
    // });





    //////////***************************************************************///////////////
    // app.post("/getdoctorbyname", async (req, resp) => {
    //   try {
    //     //let first_name = req.body.first_name;
    //     //.populate("citizen")
    //     // let doctors = await DoctorModel.citizen.findOne({ first_name: first_name })

    //     let { first_name } = req.body;
    //     let citizen = await CitizenModel.findOne({
    //       first_name: first_name
    //     }).populate("citizen");
    //     let doctor = await DoctorModel.findOne({ _id: citizen._id }); //.populate({path:"citizen", populate: Utils.address})
    //     resp.json(doctor);
    //   } catch (e) {
    //     resp.json(e);
    //   }
    // });
    //=================================================================
    // app.post("/getdoctorbyid", Utils.verifyToken, async (req, resp) => {
    //   let { _id } = req.body;

    //   let doctors = await DoctorModel.findOne({ _id }).populate({
    //     path: "citizen",
    //     populate: Utils.address
    //   });
    //   resp.json(doctors);



    //   //====================================

    //   //       let citizen = await CitizenModel.findOne({ _id }).populate("citizen");
    //   //       let doctor = await DoctorModel.findOne({_id:citizen._id})//.populate({path:"citizen", populate: Utils.address})
    //   //       resp.json(doctor);

    //   //     } catch (e) {
    //   //       resp.json(e);
    //   //     }
    // });

    //================================================

    // app.post("/getdoctorbynames", async (req, resp) => {
    //   try {
    //     let name = req.body.name;
    //     //.populate("citizen")
    //     let doctors = await CitizenModel.findOne({ first_name: name }).populate(
    //       "citizen"
    //     );
    //     let doctor = await DoctorModel.findOne({ _id: doctors._id });

    //     // let doctorrrrr = new DoctorModel({
    //     //   citizen: doctors,
    //     //   specialization: doctor.specialization
    //     // });
    //     resp.json(doctor);
    //   } catch (e) {
    //     resp.json(e);
    //   }
    // });

    // app.get("/getdoctorscount", async (req, resp) => {
    //   let count = await DoctorModel.count();
    //   resp.json({ count: count });
    // });

    // app.post("/removedoctor", async (req, resp) => {
    //   let doctorId = req.body.id;
    //   await DoctorModel.remove({ _id: doctorId });
    //   resp.json({ message: "deleted" });
    // });

    // app.post("/updatedoctorname", async (req, resp) => {
    //   let doctorId = req.body.id;
    //   let newName = req.body.name;
    //   let spec = req.body.specialization;

    //   await DoctorModel.findOneAndUpdate(
    //     { _id: doctorId },
    //     { name: newName, specialization: spec }
    //   );
    //   resp.json({ message: "updated" });
    // });

    // app.get("/getdoctornames",async(req,resp)=>{
    //     let doctors = await DoctorModel.find({}).select("name age")
    //     resp.json(doctors)

    // })
}

module.exports = DoctorAPIS;