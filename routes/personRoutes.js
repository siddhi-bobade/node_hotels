const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//POST route to add new person
router.post("/", async (req, res) => {
    const personData = req.body;

    try {
        // Create a new person object
        const newPerson = new Person(personData);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log("New person is saved successfully ");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error while saving the data ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// GET route to get all persons
router.get('/', async (req, res) => {
    try {

        const personsData = await Person.find();
        console.log(" Persons Data is fetched successfully ");
        res.status(200).json(personsData);

    } catch (err) {
        console.log("Error while fetching the data ", error);
        res.status(500).json({ error: "Internal server error" });
    }

})

// GET route to get a particular workType person
router.get("/:workType", async (req, res) => {

    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
            const response = await Person.find({ work: workType });
            console.log("Person with this workType is fetched successfully");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid workType" });
        }
    } catch (error) {
        console.log("Error while fetching the data ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// PUT route to update a persons data
router.put("/:id", async (req, res) => {

    try {
        const personId = req.params.id;
        const updatePerson = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatePerson, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json({ error: "Person not found" })
        }

        console.log("Data is updated successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error while fetching the data ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// DELETE route to delete a person
router.delete("/:PersonId",async (req,res)=>{
    try {
        const personId = req.params.PersonId;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            res.status(404).json({ error: "Person not found" })
        }

        console.log("Data is deleted successfully");
        res.status(200).json(response);

    } catch (error) {
        console.log("Error while fetching the data ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
module.exports = router;
