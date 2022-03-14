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

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
