const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// require the Drone model here
const Drone = require("../models/Drone.model");

// router.use("/drones", (req, res, next) => {
//   console.log("hello we on any drons rout");
//   next();
// });

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const dronesFromDB = await Drone.find();
    console.log(dronesFromDB);
    res.render("drones/list", { Drones: dronesFromDB });
  } catch (err) {
    console.log("there was an error rendering to the hbs", err);
  }
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  console.log(req.body);
  console.log("hello");

  try {
    const createDrone = new Drone({
      name: req.body.name,
      propellers: req.body.propeller,
      maxSpeed: req.body.speed,
    });

    await createDrone.save();
    res.redirect("/drones");

    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.redirect("/drones/create");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  console.log("FROM GET", req.params)
  const dronesId = mongoose.Types.ObjectId(req.params.id); /// ?
  const droneDetails = await Drone.findById(dronesId);
  console.log(droneDetails);

  res.render('drones/update-form', { droneDetails });
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    console.log("FROM Post", req.params)
    // HOW is it possible that req.params.id changed?! (spaces at beginning and eng)
    const dronesId = mongoose.Types.ObjectId(req.params.id.trimStart().trimEnd());
    await Drone.findByIdAndUpdate(dronesId, { ...req.body });
    console.log("Drone successfully changed!")
    res.redirect("/drones");
  } 
  catch (err) {
    console.log(err);
    res.redirect("/drones/" + dronesId + "/edit");
  }  
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
