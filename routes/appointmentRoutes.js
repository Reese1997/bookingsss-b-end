const express = require("express");
const app = express.Router();
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function getToday() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
  
    today = mm + "/" + dd + "/" + yyyy;
  
    return today;
  }
  router.get('/booking', (req, res) => {
    res.send('user test success')
})

// GET all users
router.get("/", async (req, res) => {
    try {
      const bookings = await User.find();
      res.json(bookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
  // GET one user
  router.get("/:id", getBooking, (req, res, next) => {
    res.send(res.user);
  });
  
  // LOGIN user with email + password
  router.patch("/", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) res.status(404).json({ message: "Could not find user" });
    if (await bcrypt.compare(password, user.password)) {
      try {
        const access_token = jwt.sign(
          JSON.stringify(user),
          process.env.JWT_SECRET_KEY
        );
        res.status(201).json({ jwt: access_token });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Email and password combination do not match" });
    }
  });
  
  router.post("/", async (req, res, next) => {
    const { name, email, password } = req.body;
  
    console.log(name, email, password)
  
    const salt = await bcrypt.genSalt();
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
  
    try {
      const newUser = await user.save();
  
      try {
        const access_token = jwt.sign(
          JSON.stringify(newUser),
          process.env.MONGO_PASS
        );
        res.status(201).json({ jwt: access_token });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // UPDATE 
  router.put("/:id", getBooking, async (req, res) => {
    const { name, password, about } = req.body;
    if (name) res.user.name = name;
    if (about) res.user.about = about;
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      res.user.password = hashedPassword;
    }
  
    try {
      const updatedBooking = await res.booking.save();
      res.status(201).send(updatedBooking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE 
  router.delete("/:id", getBooking, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: "Deleted user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//   //remove this
//     router.get("/appointments", getUser, (req, res, next) => {
//       res.send(res.user);
// //delete this

//  create appointment
 router.post("/:id/appointment", auth, async (req, res) => {
     const newAppointment = new Appointment(req.body);
  
     try {
       const savedAppointment = await newAppointment.save();
       res.status(200).json(savedAppointment);
     } catch (err) {
       res.status(500).json(err);
   }
   });
  
   //UPDATE an appointment
  router.put("/:id/appointment", auth, async (req, res) => {
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        {
           $set: req.body,
         },
        { new: true }
       );
       res.status(200).json(updatedAppointment);
     } catch (err) {
      res.status(500).json(err);
     }
  });
  
   //DELETE from appointment
   router.delete("/:id/appointment", auth, async (req, res) => {
     try {
       await Cart.findByIdAndDelete(req.params.id);
       res.status(200).json("Appointment has been deleted...");
     } catch (err) {
       res.status(500).json(err);
     }
   });
module.exports = router