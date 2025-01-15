const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid')

const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/interview")

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


// Delete user by ID
app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully", deletedUser });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});



app.post('/createUser', (req, res) => {
    const { name, country, company, questions } = req.body;

    const newUser = new UserModel({
        userId: uuidv4(), // Generate a unique ID
        name,
        country,
        company,
        questions,
    });

    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});



app.put('/updateUser/:id', (req, res) => {
    const { name, country, company, questions } = req.body;
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            country,
            company,
            questions,
            updatedAt: Date.now(), // Update timestamp
        },
        { new: true }
    )
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001,()=>{
    console.log("Server is Running")
})