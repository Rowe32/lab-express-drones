// Iteration #1

// file runs just one time: purpose to fill the DB with 3 drones

require('../db');

const Drone = require('../models/Drone.model');
const mongoose = require('mongoose')

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];


  async function main() {
      try {
        await Drone.create(drones);
        console.log('All the drones were seeded! Good Job!');
      }
      catch(err) {
        console.log("There was an error seeding", err);
      }
      finally {
        await mongoose.disconnect(); // await or not?
        console.log("everything was disconnected ok.")
      }
  }

main()